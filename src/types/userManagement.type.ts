import {
    TAcademicDepartment,
    TAcademicFaculty,
    TAcademicSemester,
} from './academicManagement.type';

export type TName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type TGuardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContact: string;
    motherName: string;
    motherOccupation: string;
    motherContact: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TStudent = {
    _id: string;
    id: string;
    user: string;
    name: TName;
    gender: string;
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergencyContact: string;
    bloodGroup: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg: string;
    academicDepartment: TAcademicDepartment;
    academicFaculty: TAcademicFaculty;
    admissionSemester: TAcademicSemester;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    fullName: string;
};
