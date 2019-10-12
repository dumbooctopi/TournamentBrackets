import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

// import Provider (Step 2)
import { Provider } from 'react-redux';

// import store from Step 1 and give access to Provider (Step 3)
import store from './store';

render(
  <Provider store = { store } >
    <App />
  </Provider>,
  document.getElementById('root'),
);
