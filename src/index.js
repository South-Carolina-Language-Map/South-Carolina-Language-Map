import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';
import Admin from './components/Admin/Admin';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
