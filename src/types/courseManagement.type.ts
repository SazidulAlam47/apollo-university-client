import {
    TAcademicDepartment,
    TAcademicFaculty,
    TAcademicSemester,
} from './academicManagement.type';
import { TFaculty, TStudent } from './userManagement.type';

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

export type TDay = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TOfferedCourse = {
    _id: string;
    semesterRegistration: TSemesterRegistration;
    academicSemester: TAcademicSemester;
    academicFaculty: TAcademicFaculty;
    academicDepartment: TAcademicDepartment;
    course: TCourse;
    faculty: TFaculty;
    maxCapacity: number;
    section: number;
    days: TDay[];
    startTime: string;
    endTime: string;
};

export type TEnrolledCourses = {
    _id: string;
    semesterRegistration: TSemesterRegistration;
    academicSemester: TAcademicSemester;
    academicFaculty: TAcademicFaculty;
    academicDepartment: TAcademicDepartment;
    offeredCourse: TOfferedCourse;
    course: TCourse;
    student: TStudent;
    faculty: TFaculty;
    isEnrolled: boolean;
    courseMarks: TCourseMarks;
    grade: string;
    gradePoints: number;
    isCompleted: boolean;
};

export type TCourseMarks = {
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
};
