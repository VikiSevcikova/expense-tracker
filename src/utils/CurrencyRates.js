const currencyRates = [
  {
    name: "CAD",
    rate: 1,
  },
  {
    name: "USD",
    rate: 0.79,
  },
  {
    name: "JPY",
    rate: 91.18,
  },
];

export const rateConverter = (amount, rate) => {
  return Math.round(amount * rate * 100) / 100;
};

export default currencyRates;
