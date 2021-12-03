const currencyLabel = [
  { name: "CAD", symbol: "$" },
  { name: "USD", symbol: "$" },
  { name: "JPY", symbol: "¥" },
  { name: "EUR", symbol: "€" },
  { name: "GBP", symbol: "₤" },
];

export const rateConverter = (amount, rate) => {
  return Math.round(amount * rate * 100) / 100;
};

export default currencyLabel;
