import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import ItemDetails from '../ItemDetails';

const StarshipDetails = (props) => {
  const { selectedItem, loadingState, errorState } = props;

  const {
    name,
    img,
    model,
    starshipClass,
    manufacturer,
    length,
    costInCredits,
  } = selectedItem;

  const state = {
    loadingState,
    errorState,
  };

  return (
    <ItemDetails name={name} image={img} state={state}>
      <ListItem name="Model" value={model} />
      <ListItem name="Class" value={starshipClass} />
      <ListItem name="Manufacturer" value={manufacturer} />
      <ListItem name="Length" value={length} />
      <ListItem name="Cost" value={costInCredits} />
    </ItemDetails>
  );
};

StarshipDetails.defaultProps = {
  selectedItem: {},
};

StarshipDetails.propTypes = {
  selectedItem: PropTypes.instanceOf(Object),
  loadingState: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default StarshipDetails;
