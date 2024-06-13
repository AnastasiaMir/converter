import onChange from 'on-change';

const renderConverter = (state, elements) => {
  elements.panelRates.classList.remove('active');
  elements.panelRates.classList.remove('show');
  elements.panelConverter.classList.add('show');
  elements.panelConverter.classList.add('active');
  if (state.chosenCurrency !== '') {
    const [currentRate] = state.data
      .filter((currency) => currency.code === state.chosenCurrency);
    elements.form.reset();
    elements.feedback.textContent = '';
    const result = state.amount * currentRate.value;
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
    elements.feedback.textContent = `${state.amount} ${state.baseCurrency} = ${result} ${state.chosenCurrency}`;
  }
};

const renderRates = (state, elements) => {
  elements.select.replaceChildren();
  elements.panelConverter.classList.remove('active');
  elements.panelConverter.classList.remove('show');
  elements.panelRates.classList.add('show');
  elements.panelRates.classList.add('active');
  const currencies = state.data
    .map((currency) => {
      const option = document.createElement('option');
      option.setAttribute('value', currency.code);
      if (currency.code === state.baseCurrency) {
        option.setAttribute('selected', 'selected');
      }
      option.textContent = currency.code;
      elements.select.append(option);
    });
  elements.tbody.replaceChildren();
  const rows = state.data
    .map((currency) => {
      const trEl = document.createElement('tr');
      const thEl = document.createElement('th');
      thEl.setAttribute('scope', 'row');
      thEl.textContent = currency.code;
      trEl.append(thEl);
      const tdEl = document.createElement('td');
      tdEl.textContent = currency.value;
      trEl.append(tdEl);
      elements.tbody.append(trEl);
    });
};

const renderError = (state, elements) => {
  elements.feedback.classList.remove('text-success');
  elements.feedback.classList.add('text-danger');
  elements.feedback.textContent = state.error;
};

const initView = (state, elements) => onChange(state, (path, value) => {
  switch (path) {
    case 'data':
      state.activeTab === 'converter' ? renderConverter(state, elements) : renderRates(state, elements);
      break;
    case 'activeTab':
      if (value === 'converter') {
        renderConverter(state, elements);
      } else if (value === 'rates') {
        renderRates(state, elements);
      }
      break;
    case 'baseCurrency':
      renderRates(state, elements);
      break;
    case 'error':
      renderError(state, elements);
      break;
  }
});
export default initView;
