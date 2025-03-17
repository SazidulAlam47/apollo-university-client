const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const monthsOptions = months.map((month) => ({
    value: month,
    label: month,
}));

export const currentYear = new Date().getFullYear();
