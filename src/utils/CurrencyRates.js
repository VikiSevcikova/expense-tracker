const currencyRates = ["CAD", "USD", "JPY", "EUR", "HKD"];

export const rateConverter = (amount, rate) => {
  return Math.round(amount * rate * 100) / 100;
};

export default currencyRates;
