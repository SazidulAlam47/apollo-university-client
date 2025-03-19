export const genderOptions = [
    {
        value: 'Male',
        label: 'Male',
    },
    {
        value: 'Female',
        label: 'Female',
    },
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const bloodGroupOptions = bloodGroups.map((blood) => ({
    value: blood,
    label: blood,
}));
