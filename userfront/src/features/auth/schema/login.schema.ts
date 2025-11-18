import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'EMAIL_REQUIRED')
    .email('EMAIL_INVALID')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'PASSWORD_REQUIRED')
    .min(8, 'PASSWORD_MIN_LENGTH'),
  rememberMe: z.boolean().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
