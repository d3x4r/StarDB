
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import PeoplePage from '../PeoplePage';
import StarshipPage from '../StarshipsPage';
import PlanetsPage from '../PlanetsPage';
import StarshipDetails from '../StarshipDetails';
import PlanetDetails from '../PlanetDetails';

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
    loadingStarshipDetailState: true,
    loadingStarshipError: false,
    loadingPlanetsDetailsState: true,
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

  onPersonSelect = async (id) => {
    this.setState({ loadingItemDetailState: true, loadingItemError: false });
    this.setPerson(id);
  }

  onStarshipSelect = async (id) => {
    this.setState({ loadingStarshipDetailState: true, loadingStarshipError: false });
    this.setStarship(id);
  }

  onPlanetSelect = async (id) => {
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

    if (appError) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <Header />
        <RandomPlanet data={planetData} />
        <Switch>
          <Route path="/" exact render={() => <h2>Welcome to StarDB</h2>} />
          <Route path="/people/:id?">
            <PeoplePage
              items={people}
              onPersonSelect={this.onPersonSelect}
              selectedItem={selectedPerson}
              loadingState={loadingItemDetailState}
              errorState={loadingItemError}
            />
          </Route>
          <Route path="/starships/" exact>
            <StarshipPage items={starships} onStarshipSelect={this.onStarshipSelect} />
          </Route>
          <Route path="/planets/" exact>
            <PlanetsPage items={planets} onPlanetSelect={this.onPlanetSelect} />
          </Route>
          <Route
            path="/starships/:id"
            render={({ match }) => {
              const { id } = match.params;
              if (selectedStarship.id !== id) {
                this.setStarship(id);
              }
              return (
                <StarshipDetails
                  selectedItem={selectedStarship}
                  loadingState={loadingStarshipDetailState}
                  errorState={loadingStarshipError}
                />
              );
            }}
          />
          <Route
            path="/planets/:id"
            render={({ match }) => {
              const { id } = match.params;
              if (selectedPlanet.id !== id) {
                this.setPlanet(id);
              }
              return (
                <PlanetDetails
                  selectedItem={selectedPlanet}
                  loadingState={loadingPlanetsDetailsState}
                  errorState={loadingPlanetsError}
                />
              );
            }}
          />
          <Route render={() => <h2>PAGE NOT FOUND</h2>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
