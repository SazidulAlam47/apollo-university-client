import { TAcademicSemester } from './academicManagement.type';
import { TFaculty } from './userManagement.type';

export type TSemesterRegistration = {
    _id: string;
    academicSemester: TAcademicSemester;
    startDate: string;
    endDate: string;
    status: 'Upcoming' | 'Ongoing' | 'Ended';
    minCredit: number;
    maxCredit: number;
};

export type TPreRequisiteCourse = {
    course: TCourse;
    isDeleted: boolean;
};

export type TCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: TPreRequisiteCourse[];
    isDeleted: boolean;
};

export type TCourseFaculties = {
    _id: string;
    course: TCourse;
    faculties: TFaculty[];
};
