/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage';

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="row block">
          <ErrorMessage />
        </div>
      );
    }

    return children;
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundry;
