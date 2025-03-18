import { currentYear } from './global';

export const nameOptions = [
    {
        value: '01',
        label: 'Autumn',
    },
    {
        value: '02',
        label: 'Summer',
    },
    {
        value: '03',
        label: 'Fall',
    },
];

export const yearOptions = [0, 1, 2, 3].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

export const filterSemesterNames = nameOptions.map((item) => ({
    text: item.label,
    value: item.label,
}));

export const filterYears = yearOptions.map((year) => ({
    text: year.value,
    value: year.value,
}));
