import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';
import ItemDetails from '../ItemDetails';

const PlanetDetails = (props) => {
  const { selectedItem, loadingState, errorState } = props;

  const {
    name,
    img,
    population,
    rotationPeriod,
    diameter,
    terrain,
    gravity,
    surfaceWater,
  } = selectedItem;

  const state = {
    loadingState,
    errorState,
  };

  return (
    <ItemDetails name={name} image={img} state={state}>
      <ListItem name="Population" value={population} />
      <ListItem name="Rotation period" value={rotationPeriod} />
      <ListItem name="Diameter" value={diameter} />
      <ListItem name="Terrain" value={terrain} />
      <ListItem name="Gravity" value={gravity} />
      <ListItem name="Surface water" value={surfaceWater} />
    </ItemDetails>
  );
};

PlanetDetails.defaultProps = {
  selectedItem: {},
};

PlanetDetails.propTypes = {
  selectedItem: PropTypes.instanceOf(Object),
  loadingState: PropTypes.bool.isRequired,
  errorState: PropTypes.bool.isRequired,
};

export default PlanetDetails;
