import { capitalizeFirstLetter } from 'better-auth';
import dayjs from 'dayjs';
import { and, eq, gte, inArray, lte } from 'drizzle-orm';
import React from 'react';

import { ChartAreaGradient } from '@/components/ui/area-chart';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderSubTitle,
  PageHeaderTextualContent,
  PageHeaderTextualDescription,
  PageHeaderTitle,
} from '@/components/ui/defaultpage';
import { Progress } from '@/components/ui/progress';
import { db } from '@/db';
import * as schema from '@/db/schema';

interface DashboardProps {
  params: { id: string };
}

const getTodayAppointments = async (clinicId: string) => {
  const today = dayjs().startOf('day');
  const tomorrow = today.add(1, 'day');
  // Busca appointments do dia atual
  const appointments = await db
    .select({
      id: schema.appoitments.id,
      date: schema.appoitments.date,
      patientId: schema.appoitments.patientId,
      doctorId: schema.appoitments.doctorId,
    })
    .from(schema.appoitments)
    .where(
      and(
        eq(schema.appoitments.clinicId, clinicId),
        gte(schema.appoitments.date, today.toDate()),
        lte(schema.appoitments.date, tomorrow.toDate()),
      ),
    );
  // Busca pacientes e doctors relacionados
  const doctorIds = appointments.map((a) => a.doctorId);
  const patientIds = appointments.map((a) => a.patientId);

  const doctors = await db
    .select({
      id: schema.doctors.id,
      name: schema.doctors.name,
      specialization: schema.doctors.specialization,
    })
    .from(schema.doctors)
    .where(inArray(schema.doctors.id, doctorIds));
  const patients = await db
    .select({
      id: schema.patients.id,
      name: schema.patients.name,
    })
    .from(schema.patients)
    .where(inArray(schema.patients.id, patientIds));

  return appointments.map((a) => ({
    ...a,
    doctor: doctors.find((d) => d.id === a.doctorId),
    patient: patients.find((p) => p.id === a.patientId),
  }));
};
const getSpecializationStats = async (clinicId: string) => {
  // Busca todas as especializações dos doctors da clínica
  const doctors = await db
    .select({
      specialization: schema.doctors.specialization,
    })
    .from(schema.doctors)
    .where(eq(schema.doctors.clinicId, clinicId));

  const total = doctors.length;
  if (total === 0) return { specialization: '', percent: 0 };

  // Conta a frequência de cada especialização
  const freq: Record<string, number> = {};
  doctors.forEach((d) => {
    if (!d.specialization) return;
    freq[d.specialization] = (freq[d.specialization] || 0) + 1;
  });

  // Encontra a mais frequente
  const [most, count] = Object.entries(freq).sort((a, b) => b[1] - a[1])[0] || [
    '',
    0,
  ];

  return {
    specialization: most,
    percent: Math.round((count / total) * 100),
  };
};

const getClinicDashboardData = async (clinicId: string) => {
  // Appointments
  const appointments = await db
    .select()
    .from(schema.appoitments)
    .where(eq(schema.appoitments.clinicId, clinicId));

  const totalAppointments = appointments.length;

  // Patients
  const patients = await db
    .select({ id: schema.patients.id })
    .from(schema.patients)
    .where(eq(schema.patients.clinicId, clinicId));
  const totalPatients = patients.length;

  // Medics
  const medics = await db
    .select({
      id: schema.doctors.id,
      value: schema.doctors.appoitmentPriceInCents,
      name: schema.doctors.name,
      specialization: schema.doctors.specialization,
    })
    .from(schema.doctors)
    .where(eq(schema.doctors.clinicId, clinicId));
  const totalMedics = medics.length;

  // Fature
  const totalFature = medics.reduce(
    (acc, curr) => acc + (Number(curr.value) / 100 || 0),
    0,
  );

  return {
    totalFature,
    totalAppointments,
    totalPatients,
    totalMedics,
    medics,
  };
};

// Busca os dados para o gráfico de faturamento diário do último mês
const getFatureChartData = async (clinicId: string) => {
  const today = dayjs().endOf('day');
  const oneMonthAgo = today.subtract(1, 'month').startOf('day');

  // Join entre appointments e doctors para pegar o valor do doutor
  const appointments = await db
    .select({
      date: schema.appoitments.date,
      doctorId: schema.appoitments.doctorId,
      appoitmentId: schema.appoitments.id,
      doctorValue: schema.doctors.appoitmentPriceInCents,
    })
    .from(schema.appoitments)
    .innerJoin(
      schema.doctors,
      eq(schema.appoitments.doctorId, schema.doctors.id),
    )
    .where(
      and(
        eq(schema.appoitments.clinicId, clinicId),
        gte(schema.appoitments.date, oneMonthAgo.toDate()),
        lte(schema.appoitments.date, today.toDate()),
      ),
    );

  // Agrupa por dia e soma o valor total
  const dailyMap: Record<string, number> = {};
  appointments.forEach((a) => {
    const dateKey = dayjs(a.date).format('YYYY-MM-DD');
    const value = Number(a.doctorValue) / 100 || 0;
    dailyMap[dateKey] = (dailyMap[dateKey] || 0) + value;
  });

  // Gera array para todos os dias do período, mesmo os sem faturamento
  const days: { date: string; value: number }[] = [];
  for (
    let d = oneMonthAgo.clone();
    d.isBefore(today) || d.isSame(today, 'day');
    d = d.add(1, 'day')
  ) {
    const dateKey = d.format('YYYY-MM-DD');
    days.push({
      date: dateKey,
      value: dailyMap[dateKey] ?? 0,
    });
  }

  return days;
};

const ClinicDashboard = async ({ params }: DashboardProps) => {
  const clinicId = params.id;
  const { totalFature, totalAppointments, totalPatients, totalMedics, medics } =
    await getClinicDashboardData(clinicId);

  const chartData = await getFatureChartData(clinicId);
  const todayAppointments = await getTodayAppointments(clinicId);
  const specializationStats = await getSpecializationStats(clinicId);
  const cards = [
    {
      title: 'Faturing',
      value: `R$ ${totalFature.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    },
    {
      title: 'Appoitments',
      value: totalAppointments,
    },
    {
      title: 'Patients',
      value: totalPatients,
    },
    {
      title: 'Medics',
      value: totalMedics,
    },
  ];

  return (
    <PageContainer>
      <div className="space-y-4 gap-y-4">
        <PageHeader>
          <PageHeaderTextualContent>
            <PageHeaderTextualDescription>
              <PageHeaderTitle>Clinic Dashboard</PageHeaderTitle>
              <PageHeaderSubTitle>
                Overview of your clinic main indicators
              </PageHeaderSubTitle>
            </PageHeaderTextualDescription>
          </PageHeaderTextualContent>
        </PageHeader>
        <PageContent>
          <div className="m-0 flex h-full w-full flex-col content-center justify-start p-0">
            <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-4">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow"
                >
                  <span className="text-lg font-semibold text-gray-700">
                    {card.title}
                  </span>
                  <span className="mt-2 text-2xl font-bold text-black">
                    {card.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Chart + Doctors List */}
            <div className="flex w-full flex-col gap-8 md:flex-row">
              {/* Area Chart */}
              <div className="flex-1 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-semibold">
                  Faturing (Last 30 days)
                </h3>
                <ChartAreaGradient data={chartData} yField="value" />
              </div>
              {/* Doctors List */}
              <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow md:w-72">
                <h3 className="mb-4 text-lg font-semibold">Doctors</h3>
                {medics.length === 0 && (
                  <span className="text-sm text-gray-500">
                    No doctors registered.
                  </span>
                )}
                {medics.map((medic) => (
                  <div
                    key={medic.id}
                    className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0"
                  >
                    <Avatar>
                      <AvatarFallback className="h-20 w-20">
                        {medic.name
                          .split(' ')
                          .map((item) => item[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-800">
                        {medic.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {capitalizeFirstLetter(medic.specialization)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row content-start justify-between">
            <div className="mt-10 w-[50%] rounded-lg bg-white p-6 shadow">
              <h3 className="mb-4 text-lg font-semibold">
                Todays Appointments
              </h3>
              {todayAppointments.length === 0 ? (
                <span className="text-sm text-gray-500">
                  No appointments for today.
                </span>
              ) : (
                <ul className="divide-y">
                  {todayAppointments.map((a) => (
                    <li
                      key={a.id}
                      className="flex flex-col justify-between gap-2 py-3 md:flex-row md:items-center"
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-center">
                        <span className="font-medium text-gray-800">
                          {a.patient?.name ?? 'Unknown Patient'}
                        </span>
                        <span className="hidden text-xs text-gray-400 md:inline">
                          |
                        </span>
                        <span className="text-sm text-gray-600">
                          {a.doctor?.name ?? 'Unknown Doctor'} (
                          {capitalizeFirstLetter(
                            a.doctor?.specialization ?? '',
                          )}
                          )
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {dayjs(a.date).format('HH:mm')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Specialization Progress */}
            <div className="mt-10 flex w-[50%] flex-col gap-4 rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-lg font-semibold">
                Most Common Specialization
              </h3>
              {specializationStats.percent === 0 ? (
                <span className="text-sm text-gray-500">
                  No doctors registered.
                </span>
              ) : (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {capitalizeFirstLetter(
                        specializationStats.specialization,
                      )}
                    </span>
                    <span className="text-sm text-gray-600">
                      {specializationStats.percent}%
                    </span>
                  </div>
                  <Progress
                    value={specializationStats.percent}
                    className="h-3"
                  />
                </div>
              )}
            </div>
          </div>
        </PageContent>
      </div>
    </PageContainer>
  );
};

export default ClinicDashboard;
