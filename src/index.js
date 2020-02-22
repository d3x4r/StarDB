import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import './bootstrap.min.css';
import './fonts/fonts.css';

render(
  <App />,
  document.querySelector('#root'),
);
