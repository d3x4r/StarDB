/* eslint-disable react/state-in-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Items from '../Items';
import ErrorBoundry from '../ErrorBoundry';

const getLabel = ({ name }) => <span>{name}</span>

const PlanetPage = (props) => {
  const { items, onPlanetSelect, history } = props;

  const setPlanet = (id) => (evt) => {
    evt.preventDefault();
    history.push(`/planets/${id}`);
    onPlanetSelect(id);
  };

  return (
    <ErrorBoundry>
      <div className="row">
        <div className="col">
          <Items
            items={items}
            onClickHandler={setPlanet}
            getLabel={getLabel}
          />
        </div>
      </div>
    </ErrorBoundry>
  );
}

getLabel.defaultProps = {
  name: '',
}

PlanetPage.defaultProps = {
  items: [],
};

PlanetPage.propTypes = {
  items: PropTypes.instanceOf(Array),
  onPlanetSelect: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

getLabel.propTypes = {
  name: PropTypes.string,
};

export default withRouter(PlanetPage);
