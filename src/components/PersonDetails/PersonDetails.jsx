import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import ItemDetails from '../ItemDetails';

const PersonDetails = (props) => {
  const { selectedItem, loadingState, errorState } = props;
  const {
    name,
    img,
    gender,
    birthYear,
    eyeColor,
  } = selectedItem;

  const state = {
    loadingState,
    errorState,
  };


  return (
    <ItemDetails name={name} image={img} state={state}>
      <ListItem name="Gender" value={gender} />
      <ListItem name="Birth year" value={birthYear} />
      <ListItem name="Eye color" value={eyeColor} />
    </ItemDetails>
  );
};

PersonDetails.defaultProps = {
  selectedItem: {},
};

PersonDetails.propTypes = {
  selectedItem: PropTypes.instanceOf(Object),
  loadingState: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default PersonDetails;
