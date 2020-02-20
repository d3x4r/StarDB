
import React, { Component } from 'react';

import './App.css';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import PeoplePage from '../PeoplePage';
import StarshipPage from '../StarshipsPage';
import PlanetsPage from '../PlanetsPage';

import SwapiService from '../../services';
import ErrorMessage from '../ErrorMessage';

class App extends Component {
  swapi = new SwapiService();

  // eslint-disable-next-line react/state-in-constructor
  state = {
    randomPlanet: {},
    loadingPlanetError: false,
    loadingPlanetState: true,
    loadingItemDetailState: false,
    loadingItemError: false,
    loadingStarshipDetailState: false,
    loadingStarshipError: false,
    loadingPlanetsDetailsState: false,
    loadingPlanetsError: false,
    people: null,
    starships: null,
    planets: null,
    selectedPerson: {},
    selectedStarship: {},
    selectedPlanet: {},
    appError: false,
  }

  componentDidMount() {
    this.setRandomPlanet();
    this.setStarshipsList();
    this.setPeopleList();
    this.setPlanetsList();
  }

  componentDidCatch() {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ onPageError: true });
  }

  setRandomPlanet = async () => {
    const planetNumber = 4;

    try {
      const planet = await this.swapi.getPlanet(planetNumber);
      this.setState({
        randomPlanet: planet,
        loadingPlanetState: false,
      });
    } catch (err) {
      this.setState({ loadingPlanetError: true, loadingPlanetState: false });
    }
  }

  setPeopleList = async () => {
    const people = await this.swapi.getPeople();
    this.setState({ people });
  }

  setPlanetsList = async () => {
    const planets = await this.swapi.getPlanets();
    this.setState({ planets });
  }

  setStarshipsList = async () => {
    const starships = await this.swapi.getStarships();
    this.setState({ starships });
  }

  setPerson = async (id) => {
    try {
      const selectedPerson = await this.swapi.getPerson(id);
      this.setState({ selectedPerson, loadingItemDetailState: false });
    } catch (err) {
      this.setState({
        loadingItemError: true,
        loadingItemDetailState: false,
      });
    }
  }

  setStarship = async (id) => {
    try {
      const selectedStarship = await this.swapi.getStarship(id);
      this.setState({ selectedStarship, loadingStarshipDetailState: false });
    } catch (err) {
      this.setState({
        loadingStarshipError: true,
        loadingStarshipDetailState: false,
      });
    }
  }

  setPlanet = async (id) => {
    try {
      const selectedPlanet = await this.swapi.getPlanet(id);
      this.setState({ selectedPlanet, loadingPlanetsDetailsState: false });
    } catch (err) {
      this.setState({
        loadingPlanetsError: true,
        loadingPlanetsDetailsState: false,
      });
    }
  }

  onPersonSelect = (id) => async (evt) => {
    evt.preventDefault();
    this.setState({ loadingItemDetailState: true, loadingItemError: false });
    this.setPerson(id);
  }

  onStarshipSelect = (id) => async (evt) => {
    evt.preventDefault();
    this.setState({ loadingStarshipDetailState: true, loadingStarshipError: false });
    this.setStarship(id);
  }

  onPlanetSelect = (id) => async (evt) => {
    evt.preventDefault();
    this.setState({ loadingPlanetsDetailsState: true, loadingPlanetsError: false });
    this.setPlanet(id);
  }

  render() {
    const {
      randomPlanet,
      loadingPlanetState,
      loadingPlanetError,
      people,
      selectedPerson,
      loadingItemDetailState,
      loadingItemError,
      appError,
      starships,
      selectedStarship,
      loadingStarshipDetailState,
      loadingStarshipError,
      planets,
      selectedPlanet,
      loadingPlanetsError,
      loadingPlanetsDetailsState,
    } = this.state;

    const planetData = {
      planet: randomPlanet,
      loadingState: loadingPlanetState,
      errorState: loadingPlanetError,
    };

    const peopleData = {
      items: people,
      onItemSelect: this.onPersonSelect,
      selectedItem: selectedPerson,
      loadingState: loadingItemDetailState,
      loadingError: loadingItemError,
    };

    const starshipsData = {
      items: starships,
      onItemSelect: this.onStarshipSelect,
      selectedItem: selectedStarship,
      loadingState: loadingStarshipDetailState,
      loadingError: loadingStarshipError,
    };

    const planetsData = {
      items: planets,
      onItemSelect: this.onPlanetSelect,
      selectedItem: selectedPlanet,
      loadingState: loadingPlanetsDetailsState,
      loadingError: loadingPlanetsError,
    };

    if (appError) {
      return <ErrorMessage />;
    }


    return (
      <>
        <Header />
        <RandomPlanet data={planetData} />
        <PeoplePage data={peopleData} />
        <StarshipPage data={starshipsData} />
        <PlanetsPage data={planetsData} />
      </>
    );
  }
}

export default App;
