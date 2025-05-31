import { z } from 'zod';

export const upsertPatientDbSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  sex: z.enum(['male', 'female']),
  dateOfBirth: z.string(),
  clinicId: z.string().uuid(),
});
