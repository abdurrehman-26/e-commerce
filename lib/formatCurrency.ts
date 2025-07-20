export const formatCurrency = (value: number) => {
    return value.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })
}