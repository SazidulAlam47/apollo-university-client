import { z } from 'zod';

export const semesterRegistrationSchema = z.object({
    academicSemester: z.string({
        required_error: 'Please Select a Academic Semester',
    }),
    startDate: z.any().refine((val) => val !== undefined, {
        message: 'Please Select a Start Date',
    }),
    endDate: z.any().refine((val) => val !== undefined, {
        message: 'Please Select a End Date',
    }),
    minCredit: z.string(),
    maxCredit: z.string(),
});
