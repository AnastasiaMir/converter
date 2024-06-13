export default (text) => {
  const currenciesList = ['RUB', 'EUR', 'GBP', 'UAH', 'USD', 'CAD', 'CNY', 'TRY'];
  const [amount, base_currency, word, chosen_currency] = text.split(' ');
  if (text.trim().split(' ').length !== 4) {
    return true;
  }
  if (parseFloat(amount) < 0 || word !== 'in'
 || (!currenciesList.includes(base_currency.toUpperCase())
    || !currenciesList.includes(chosen_currency.toUpperCase()))) {
    return true;
  }
  return false;
};
