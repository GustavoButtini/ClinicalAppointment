import z from 'zod';

export const upsertAppoitmentSchema = z.object({
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid(),
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  date: z.string(),
  priceInCents: z.number(),
});
