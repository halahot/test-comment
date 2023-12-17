/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import dayjs from 'dayjs';
import duration from  'dayjs/plugin/duration';

dayjs.extend(duration);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
