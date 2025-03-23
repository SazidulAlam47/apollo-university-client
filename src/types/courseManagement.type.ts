import { TAcademicSemester } from './academicManagement.type';

export type TSemesterRegistration = {
    _id: string;
    academicSemester: TAcademicSemester;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Ongoing' | 'Ended';
    minCredit: number;
    maxCredit: number;
};
