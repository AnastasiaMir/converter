import axios from 'axios';
import validate from './validator.js';
import initView from './view.js';

const fetchData = async (base_currency = 'USD') => {
  const currenciesList = ['RUB', 'EUR', 'GBP', 'UAH', 'USD', 'CAD', 'CNY', 'TRY'];
  const currencies = currenciesList.join('%2C');
  const apikey = 'cur_live_gaLJgTLfYyqJKgZXEwDbPzGUyRJ3zdYpmGJHCSnw';
  const options = {
    method: 'GET',
    url: `https://api.currencyapi.com/v3/latest?apikey=${apikey}&currencies=${currencies}&base_currency=${base_currency}`,
  };
  const response = await axios.get(options.url);

  return Object.values(response.data.data);
};

export default () => {
  const elements = {
    form: document.querySelector('.converter-form'),
    input: document.querySelector('#text-input'),
    button: document.querySelector('button[type="submit"]'),
    feedback: document.querySelector('.feedback'),
    tbody: document.querySelector('tbody'),
    select: document.querySelector('.form-select'),
    tabs: document.querySelectorAll('[role="tab"]'),
    tabConverter: document.querySelector('#converter'),
    panelConverter: document.querySelector('#div-converter'),
    tabRates: document.querySelector('#rates'),
    panelRates: document.querySelector('#div-rates'),

  };

  const state = {
    activeTab: 'converter',
    baseCurrency: 'USD',
    chosenCurrency: '',
    amount: 1,
    error: null,
    data: [],
  };

  const watchedState = initView(state, elements);

  elements.tabs.forEach((tab) => {
    tab.addEventListener('click', async (e) => {
      e.preventDefault();
      watchedState.activeTab = e.target.id;
      if (e.target.id === 'rates') {
        const response = await fetchData(state.baseCurrency);
        watchedState.data = response;
      }
    });
  });

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const text = data.get('text');
    const err = validate(text);
    if (!err) {
      const [amount, base_currency, word, chosen_currency] = text.split(' ');
      watchedState.error = null;
      watchedState.amount = parseFloat(amount);
      watchedState.baseCurrency = base_currency.toUpperCase();
      watchedState.chosenCurrency = chosen_currency.toUpperCase();
      const response = await fetchData(state.baseCurrency);
      watchedState.data = response;
      watchedState.activeTab = 'converter';
    } else {
      watchedState.error = 'Введите информацию в правильном формате!';
    }
  });

  elements.select.addEventListener('change', async (e) => {
    e.preventDefault();
    const selected = e.target.value;
    watchedState.baseCurrency = selected;
    const response = await fetchData(state.baseCurrency);
    watchedState.data = response;
  });
};
