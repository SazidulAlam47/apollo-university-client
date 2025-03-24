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
    minCredit: z.coerce
        .number({ invalid_type_error: 'Minimum Credit must be a number' })
        .min(1, { message: 'Enter a valid number for Minimum Credit' }),
    maxCredit: z.coerce
        .number({ invalid_type_error: 'Maximum Code must be a number' })
        .min(1, { message: 'Enter a valid number for Maximum Code' }),
});

export const courseSchema = z.object({
    title: z
        .string({ required_error: 'Enter the Course Title' })
        .min(1, { message: 'Enter the Course Title' }),
    prefix: z
        .string({ required_error: 'Enter the Course Prefix' })
        .min(1, { message: 'Enter the Course Prefix' }),
    code: z.coerce
        .number({ invalid_type_error: 'Code must be a number' })
        .min(1, { message: 'Enter a valid number for Course Code' }),
    credits: z.coerce
        .number({ invalid_type_error: 'Credits must be a number' })
        .min(1, { message: 'Enter a valid number for Credits' }),
    preRequisiteCourses: z.string().array().optional(),
});

export const assignCourseFacultiesSchema = z.object({
    course: z.string({ required_error: 'Please select a Course' }),
    faculties: z.string().array(),
});
