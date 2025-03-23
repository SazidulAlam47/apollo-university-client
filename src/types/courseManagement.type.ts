export type TSemesterRegistration = {
    academicSemester: string;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Ongoing' | 'Ended';
    minCredit: number;
    maxCredit: number;
};
