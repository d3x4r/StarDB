/* eslint-disable react/state-in-constructor */
import React from 'react';
import './RandomPlanet.css';

import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';

const PlanetContent = ({ planet }) => {
  const {
    id,
    name,
    population,
    rotationPeriod,
    diameter,
  } = planet;

  return (
    <>
      <img className="rounded" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="planet" width="200" height="200" />
      <div className="random-planet__text-content">
        <h2>{name}</h2>
        <ul className="list-group random-planet__list">
          <li className="list-group-item">
            {`Population ${population}`}
          </li>
          <li className="list-group-item">
            {`Rotation period ${rotationPeriod}`}
          </li>
          <li className="list-group-item">
            {`Diameter ${diameter}`}
          </li>
        </ul>
      </div>
    </>
  );
};

const RandomPlanet = ({ data }) => {
  const { planet, loadingState, errorState } = data;
  const errorMessage = errorState ? <ErrorMessage /> : null;
  const loadingProcess = loadingState ? <Spinner /> : null;
  const content = !loadingState && !errorState ? <PlanetContent planet={planet} /> : null;

  return (
    <section className="block rounded random-planet">
      {errorMessage}
      {loadingProcess}
      {content}
    </section>
  );
};

RandomPlanet.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

PlanetContent.propTypes = {
  planet: PropTypes.instanceOf(Object).isRequired,
};

export default RandomPlanet;
