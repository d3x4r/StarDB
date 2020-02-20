import React from 'react';
import './ErrorMessage.css';
import icon from './icon.svg';

const ErrorMessage = () => (
  <section className="error-message text-warning">
    <img src={icon} alt="error-icon" width="80" height="80" />
    <h3 className="error-message__title">Boom!</h3>
    <p className="error-message__text">
      something has gone terrible wrong
    </p>
    <span className="error-message__text">(but we already sent droids to fix it)</span>
  </section>
);

export default ErrorMessage;
