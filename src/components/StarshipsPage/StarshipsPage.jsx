/* eslint-disable react/state-in-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Items from '../Items';
import ErrorBoundry from '../ErrorBoundry';

const getLabel = ({ name, starshipClass }) => (
  <span>
    {name}
    {' '}
    <span className="text-muted">{starshipClass}</span>
  </span>
);

const StarshipPage = (props) => {
  const { items, onStarshipSelect, history } = props;

  const setStarship = (id) => (evt) => {
    evt.preventDefault();
    history.push(`/starships/${id}`);
    onStarshipSelect(id);
  };

  return (
    <ErrorBoundry>
      <div className="row">
        <div className="col">
          <Items
            items={items}
            onClickHandler={setStarship}
            getLabel={getLabel}
          />
        </div>
      </div>
    </ErrorBoundry>
  );
}

getLabel.defaultProps = {
  name: '',
  starshipClass: '',
}

StarshipPage.defaultProps = {
  items: [],
};

StarshipPage.propTypes = {
  items: PropTypes.instanceOf(Array),
  onStarshipSelect: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

getLabel.propTypes = {
  name: PropTypes.string,
  starshipClass: PropTypes.string,
};

export default withRouter(StarshipPage);
