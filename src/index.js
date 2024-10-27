import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './store/store';
import './index.css';
import './assets/css/toastr.min.css';
import { PersistGate } from 'redux-persist/integration/react';
require('dotenv').config();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);