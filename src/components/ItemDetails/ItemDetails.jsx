import React from 'react';
import PropTypes from 'prop-types';

import './ItemDetails.css';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const itemDetailBody = (props) => {
  const {
    selectedItem,
    children,
  } = props;

  if (!Object.keys(selectedItem).length) {
    return <p>{'<<< Select item from list'}</p>;
  }

  const { name, img } = selectedItem;

  return (
    <>
      <div className="item-details__img-container">
        <img className="rounded item-details__img" src={img} alt={name} />
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
  const { loadingState, errorState } = props;
  const renderSpinner = loadingState ? <Spinner /> : null;
  const renderContent = (!loadingState && !errorState) ? itemDetailBody(props) : null;
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
  loadingState: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
};

itemDetailBody.propTypes = {
  selectedItem: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};

export default ItemDetails;
