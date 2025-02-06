export const formatCurrency = (price: number) => {
    const formatter = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
    });

    return formatter.format(price);
}