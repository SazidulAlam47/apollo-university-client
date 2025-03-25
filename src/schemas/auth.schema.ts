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
        .min(6, { message: 'Password must be at least 6 characters' }),
});
