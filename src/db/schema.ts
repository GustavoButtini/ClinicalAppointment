import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  phone: text('phone').notNull(),
});
export const usersTableRelations = relations(users, ({ many }) => ({
  usersToClincs: many(usersToClincs),
  clinics: many(clinics),
}));

export const clinics = pgTable('clinics', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  phone: text('phone').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersToClincs = pgTable('users_to_clinics', {
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinics.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const clinicsTableRelations = relations(clinics, ({ many }) => ({
  usersToClincs: many(usersToClincs),
  doctors: many(doctors),
  appoitments: many(appoitments),
  patients: many(patients),
}));
export const usersToClinicsTableRelations = relations(
  usersToClincs,
  ({ one }) => ({
    user: one(users, {
      fields: [usersToClincs.userId],
      references: [users.id],
    }),
    clinic: one(clinics, {
      fields: [usersToClincs.clinicId],
      references: [clinics.id],
    }),
  }),
);

export const doctors = pgTable('doctors', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  imageurl: text('image_url').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  // 1 Monday 2 Tuesday 3 Wednesday 4 Thursday 5 Friday 6 Saturday 0 Sunday
  availableFromWeekDay: text('available_from_week_day').notNull(),
  availableToWeekDay: text('available_to_week_day').notNull(),
  availableFromTime: time('available_from_time').notNull(),
  availableToTime: time('available_to_time').notNull(),
  specialization: text('specialization').notNull(),
  appoitmentPriceInCents: integer('appoitment_price_in_cents').notNull(),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinics.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const doctorsTableRelations = relations(doctors, ({ one, many }) => ({
  clinics: one(clinics, {
    fields: [doctors.clinicId],
    references: [clinics.id],
  }),
  appoitments: many(appoitments),
}));

export const patientSexEnum = pgEnum('patient_sex', [
  'male',
  'female',
  'other',
]);

export const patients = pgTable('patients', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  sex: patientSexEnum('sex').notNull(),
  dateOfBirth: timestamp('date_of_birth', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
export const patientsTableRelations = relations(patients, ({ many }) => ({
  appoitments: many(appoitments),
}));
export const appoitments = pgTable('appoitments', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  patientId: uuid('patient_id')
    .notNull()
    .references(() => patients.id, { onDelete: 'cascade' }),
  doctorId: uuid('doctor_id')
    .notNull()
    .references(() => doctors.id, { onDelete: 'cascade' }),
  clinicId: uuid('clinic_id')
    .notNull()
    .references(() => clinics.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).notNull(),
});
export const appoitmentsTableRelations = relations(appoitments, ({ one }) => ({
  patients: one(patients, {
    fields: [appoitments.patientId],
    references: [patients.id],
  }),
  doctors: one(doctors, {
    fields: [appoitments.doctorId],
    references: [doctors.id],
  }),
  clinics: one(clinics, {
    fields: [appoitments.clinicId],
    references: [clinics.id],
  }),
}));
export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp('updated_at').$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
