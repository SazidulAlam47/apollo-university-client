import {
    TAcademicDepartment,
    TAcademicFaculty,
    TAcademicSemester,
} from './academicManagement.type';

export type TGender = 'Male' | 'Female';
export type TBloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';

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
    user: TUser;
    name: TName;
    gender: TGender;
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    emergencyContact: string;
    bloodGroup: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImg: string;
    academicDepartment: TAcademicDepartment;
    academicFaculty: TAcademicFaculty;
    admissionSemester: TAcademicSemester;
    isDeleted: boolean;
    fullName: string;
};

export type TUser = {
    _id: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: string;
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};

export type TFaculty = {
    _id: string;
    name: TName;
    fullName: string;
    id: string;
    user: TUser;
    designation: string;
    gender: TGender;
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    bloodGroup: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    academicDepartment: TAcademicDepartment;
    profileImg: string;
    isDeleted: boolean;
};

export type TAdmin = {
    _id: string;
    id: string;
    user: TUser;
    designation: string;
    name: TName;
    gender: TGender;
    dateOfBirth: string;
    email: string;
    contactNumber: string;
    bloodGroup: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg: string;
    isDeleted: boolean;
    fullName: string;
};
