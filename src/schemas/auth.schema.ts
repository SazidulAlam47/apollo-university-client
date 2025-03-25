import { z } from 'zod';

export const loginSchema = z.object({
    id: z
        .string({ required_error: 'Please enter your ID' })
        .min(1, { message: 'Please enter your ID' }),
    password: z
        .string({ required_error: 'Please enter your Password' })
        .min(1, { message: 'Please enter your Password' }),
});

export const changePasswordSchema = z.object({
    oldPassword: z
        .string({ required_error: 'Please enter your Old Password' })
        .min(1, { message: 'Please enter your Old Password' }),
    newPassword: z
        .string({ required_error: 'Please enter your New Password' })
        .min(6, { message: 'Password must be at least 6 characters long' })
        .refine((password) => /[a-zA-Z]/.test(password), {
            message: 'Password must contain at least one letter',
        })
        .refine((password) => /[a-z]/.test(password), {
            message: 'Password must contain at least one lowercase letter',
        })
        .refine((password) => /[A-Z]/.test(password), {
            message: 'Password must contain at least one uppercase letter',
        })
        .refine((password) => /[0-9]/.test(password), {
            message: 'Password must contain at least one number',
        })
        .refine(
            (password) =>
                /[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]/.test(password),
            {
                message: 'Password must contain at least one special character',
            },
        ),
});
