export const styleButtonRegular =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';

export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function toBoolean(str: string) {
    return str.toLowerCase() === 'true';
}

export const categoriesOptions = [
    '',
    'Cat food',
    'Dog food',
    'Bird food',
    'Cat accesories',
    'Dog accesories',
];
