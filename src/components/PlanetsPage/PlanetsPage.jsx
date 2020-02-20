/* eslint-disable react/state-in-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import Items from '../Items';
import ItemDetails from '../ItemDetails';
import ErrorBoundry from '../ErrorBoundry';
import Row from '../Row';
import ListItem from '../ListItem';

const getLabel = ({ name, starshipClass }) => (
  <p>
    {name}
    {' '}
    <span className="text-muted">{starshipClass}</span>
  </p>
);

const StarshipPage = (props) => {
  const { data } = props;

  const {
    items,
    onItemSelect,
    selectedItem,
    loadingState,
    loadingError,
  } = data;

  const {
    id,
    model,
    manufacturer,
    length,
    costInCredits,
    passengers,
    starshipClass,
  } = selectedItem;

  const LeftRowElement = (
    <Items
      items={items}
      onClickHandler={onItemSelect}
      selectedItemId={id}
      getLabel={getLabel}
    />
  );

  const rightRowElement = (
    <ItemDetails
      selectedItem={selectedItem}
      loadingState={loadingState}
      errorState={loadingError}
    >
      <ListItem name="Model" value={model} />
      <ListItem name="Class" value={starshipClass} />
      <ListItem name="Manufacturer" value={manufacturer} />
      <ListItem name="Length" value={length} />
      <ListItem name="Cost" value={costInCredits} />
      <ListItem name="Passengers" value={passengers} />
    </ItemDetails>
  );

  return (
    <ErrorBoundry>
      <Row leftElement={LeftRowElement} rightElement={rightRowElement} />
    </ErrorBoundry>
  );
}

getLabel.defaultProps = {
  name: '',
  starshipClass: '',
}

StarshipPage.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

getLabel.propTypes = {
  name: PropTypes.string,
  starshipClass: PropTypes.string,
};

export default StarshipPage;
