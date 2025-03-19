import { z } from 'zod';

export const createStudentSchema = z.object({
    password: z.string().optional(),
    name: z.object({
        firstName: z
            .string({ required_error: 'First Name is Required' })
            .min(1, { message: 'First Name is Required' }),
        middleName: z
            .string({ required_error: 'Middle Name is Required' })
            .min(1, { message: 'Middle Name is Required' }),
        lastName: z
            .string({ required_error: 'Last Name is Required' })
            .min(1, { message: 'Last Name is Required' }),
    }),
    gender: z
        .string({ required_error: 'Gender is Required' })
        .min(1, { message: 'Gender is Required' }),
    dateOfBirth: z.any().refine((val) => val !== undefined, {
        message: 'Date of Birth is Required',
    }),
    email: z
        .string({ required_error: 'Email is Required' })
        .min(1, { message: 'Email is Required' })
        .email({ message: 'Invalid Email Address' }),
    bloodGroup: z
        .string({ required_error: 'Blood Group is Required' })
        .min(1, { message: 'Blood Group is Required' }),
    contactNumber: z
        .string({ required_error: 'Contact Number is Required' })
        .min(1, { message: 'Contact Number is Required' }),
    emergencyContact: z
        .string({ required_error: 'Emergency Contact is Required' })
        .min(1, { message: 'Emergency Contact is Required' }),
    presentAddress: z
        .string({ required_error: 'Present Address is Required' })
        .min(1, { message: 'Present Address is Required' }),
    permanentAddress: z
        .string({ required_error: 'Permanent Address is Required' })
        .min(1, { message: 'Permanent Address is Required' }),
    guardian: z.object({
        fatherName: z
            .string({ required_error: 'Father Name is Required' })
            .min(1, { message: 'Father Name is Required' }),
        fatherOccupation: z
            .string({ required_error: 'Father Occupation is Required' })
            .min(1, { message: 'Father Occupation is Required' }),
        fatherContact: z
            .string({ required_error: 'Father Contact is Required' })
            .min(1, { message: 'Father Contact is Required' }),
        motherName: z
            .string({ required_error: 'Mother Name is Required' })
            .min(1, { message: 'Mother Name is Required' }),
        motherOccupation: z
            .string({ required_error: 'Mother Occupation is Required' })
            .min(1, { message: 'Mother Occupation is Required' }),
        motherContact: z
            .string({ required_error: 'Mother Contact is Required' })
            .min(1, { message: 'Mother Contact is Required' }),
    }),
    localGuardian: z.object({
        name: z
            .string({ required_error: 'Local Guardian Name is Required' })
            .min(1, { message: 'Local Guardian Name is Required' }),
        occupation: z
            .string({ required_error: 'Local Guardian Occupation is Required' })
            .min(1, { message: 'Local Guardian Occupation is Required' }),
        contactNo: z
            .string({ required_error: 'Local Guardian Contact is Required' })
            .min(1, { message: 'Local Guardian Contact is Required' }),
        address: z
            .string({ required_error: 'Local Guardian Address is Required' })
            .min(1, { message: 'Local Guardian Address is Required' }),
    }),
    academicDepartment: z
        .string({ required_error: 'Academic Department is Required' })
        .min(1, { message: 'Academic Department is Required' }),
    admissionSemester: z
        .string({ required_error: 'Admission Semester is Required' })
        .min(1, { message: 'Admission Semester is Required' }),
    image: z.any(),
});
