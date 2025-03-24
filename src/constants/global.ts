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

const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const monthsOptions = months.map((month) => ({
    value: month,
    label: month,
}));

export const daysOptions = days.map((day) => ({
    value: day,
    label: day,
}));

export const currentYear = new Date().getFullYear();
