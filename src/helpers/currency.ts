export const formatCurrencyInCentes = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USS',
  }).format(amount / 100);
};
