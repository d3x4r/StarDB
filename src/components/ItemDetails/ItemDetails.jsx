/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

import './ItemDetails.css';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const itemDetailBody = (name, image, children) => {
  if (!name) return '<<< Select item from list';

  return (
    <>
      <div className="item-details__img-container">
        <img className="rounded item-details__img" src={image} alt={name} />
      </div>
      <div className="item-details__text-content">
        <h2 className="item-details__header">{ name }</h2>
        <ul className="list-group">
          {children}
        </ul>
      </div>
    </>
  );
};

const ItemDetails = (props) => {
  const {
    name,
    image,
    state,
    children,
  } = props;

  const { loadingState, errorState } = state;
  const renderSpinner = loadingState ? <Spinner /> : null;
  const renderContent = (!loadingState && !errorState) ? itemDetailBody(name, image, children) : null;
  const renderError = errorState ? <ErrorMessage /> : null;

  return (
    <section className="block rounded item-details">
      {renderSpinner}
      {renderContent}
      {renderError}
    </section>
  );
};

ItemDetails.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  state: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};

export default ItemDetails;
