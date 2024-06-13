import axios from 'axios';

const fetchData = async (base_currency = 'USD') => {
  const currenciesList = ['RUB', 'EUR', 'GBP', 'UAH', 'USD', 'CAD', 'CNY', 'TRY'];
  const currencies = currenciesList.join('%2C');
  const apikey = 'cur_live_gaLJgTLfYyqJKgZXEwDbPzGUyRJ3zdYpmGJHCSnw';
  const options = {
    method: 'GET',
    url: `https://api.currencyapi.com/v3/latest?apikey=${apikey}&currencies=${currencies}&base_currency=${base_currency}`,
  };
  const data = await axios.get(options.url);
  return data;
};
