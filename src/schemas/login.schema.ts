import { z } from 'zod';

export const loginSchema = z.object({
    id: z
        .string({ required_error: 'Please enter your ID' })
        .min(1, { message: 'Please enter your ID' }),
    password: z
        .string({ required_error: 'Please enter your Password' })
        .min(1, { message: 'Please enter your Password' }),
});
