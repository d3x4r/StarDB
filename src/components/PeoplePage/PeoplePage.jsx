/* eslint-disable react/state-in-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import Items from '../Items';
import ItemDetails from '../ItemDetails';
import Row from '../Row';
import ErrorBoundy from '../ErrorBoundry';
import ListItem from '../ListItem';

const PeoplePage = (props) => {
  const { data } = props;

  const {
    items,
    onItemSelect,
    selectedItem,
    loadingState,
    loadingError,
  } = data;

  const getLabel = ({ name }) => name;

  const {
    id,
    gender,
    birthYear,
    eyeColor,
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
      <ListItem name="Gender" value={gender} />
      <ListItem name="Birth Year" value={birthYear} />
      <ListItem name="Eye color" value={eyeColor} />
    </ItemDetails>
  );

  return (
    <ErrorBoundy>
      <Row leftElement={LeftRowElement} rightElement={rightRowElement} />
    </ErrorBoundy>
  );
};

PeoplePage.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default PeoplePage;
