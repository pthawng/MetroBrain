import * as z from 'zod';

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'FULL_NAME_MIN_LENGTH')
      .max(50, 'FULL_NAME_MAX_LENGTH')
      .trim(),
    email: z.string()
      .min(1, 'EMAIL_REQUIRED')
      .email('EMAIL_INVALID')
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(8, 'PASSWORD_MIN_8')
      .regex(/[A-Z]/, 'PASSWORD_NO_UPPERCASE')
      .regex(/[0-9]/, 'PASSWORD_NO_NUMBER')
      .regex(/[^a-zA-Z0-9]/, 'PASSWORD_NO_SPECIAL'),
    confirmPassword: z.string().min(1, 'CONFIRM_PASSWORD_REQUIRED'),
    acceptTerms: z.boolean().refine((v) => v === true, 'TERMS_AND_CONDITIONS_REQUIRED'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'PASSWORDS_NOT_MATCH',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

// Password strength checker helper
export const checkPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score; // 0-4
};
