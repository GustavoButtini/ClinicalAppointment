import z from 'zod';

export const upsertDoctorDbSchema = z.object({
  id: z.string().uuid().optional(),
  clinicId: z.string().uuid().min(1, { message: 'You need an clinic !' }),
  name: z.string().trim().min(1, { message: 'You need to insert a name' }),
  specialization: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an specialization' }),
  email: z.string().trim().min(1, { message: 'You need to insert an e-mail' }),
  phone: z.string().trim().min(1, { message: 'You need to insert an phone' }),
  availableFromWeekDay: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an E-mail' }),
  availableToWeekDay: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an E-mail' }),
  availableFromTime: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an E-mail' }),
  availableToTime: z
    .string()
    .trim()
    .min(1, { message: 'You need to insert an E-mail' }),
  appoitmentPriceInCents: z
    .number()
    .int()
    .min(1, { message: 'You need to insert a price' }),
});

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorDbSchema>;
