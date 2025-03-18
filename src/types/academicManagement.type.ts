export type TAcademicSemester = {
    _id: string;
    name: string;
    code: string;
    year: string;
    startMonth: string;
    endMonth: string;
};

export type TAcademicFaculty = {
    _id: string;
    name: string;
};

export type TAcademicDepartment = {
    _id: string;
    name: string;
    academicFaculty: TAcademicFaculty;
};
