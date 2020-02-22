import pathParse from 'path-parse';

/* eslint-disable camelcase */
export default class SwapiService {
  _apiBase = 'https://swapi.co/api';

  getData = async (url) => {
    // eslint-disable-next-line no-underscore-dangle
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not fetch  ${url}, received ${response.status}`,
      );
    }
    const data = await response.json();
    return data;
  }

  getPeople = async () => {
    const people = await this.getData('/people/');
    return people.results.map(this.transformPersonData);
  }

  getPerson = async (id) => {
    const person = await this.getData(`/people/${id}/`);
    return this.transformPersonData(person);
  }

  getPlanets = async () => {
    const planets = await this.getData('/planets/');
    return planets.results.map(this.transformPlanetData);
  }

  getPlanet = async (id) => {
    const planet = await this.getData(`/planets/${id}/`);
    return this.transformPlanetData(planet);
  }

  getStarships = async () => {
    const starships = await this.getData('/starships/');
    return starships.results.map(this.transformStarshipData);
  }

  getStarship = async (id) => {
    const starship = await this.getData(`/starships/${id}/`);
    return this.transformStarshipData(starship);
  }

  transformPlanetData = (planet) => {
    const {
      name, diameter, population, rotation_period, url, terrain, gravity, surface_water,
    } = planet;

    const id = this.getIdFromUrl(url);

    const img = this.getImageUrl(id, 'planet');

    return ({
      id,
      name,
      population,
      diameter,
      rotationPeriod: rotation_period,
      img,
      terrain,
      gravity,
      surfaceWater: surface_water,
    });
  }

  transformStarshipData = (starship) => {
    const {
      name, model,
      manufacturer,
      cost_in_credits,
      length,
      crew,
      passengers,
      cargo_capacity,
      starship_class,
      url,
    } = starship;

    const id = this.getIdFromUrl(url);
    const img = this.getImageUrl(id, 'starship');

    return ({
      id,
      name,
      model,
      manufacturer,
      costInCredits: cost_in_credits,
      length,
      crew,
      passengers,
      cargoCapacity: cargo_capacity,
      starshipClass: starship_class,
      img,
    });
  }

  transformPersonData = (person) => {
    const {
      name, gender, birth_year, eye_color,
    } = person;

    const id = this.getIdFromUrl(person.url);
    const img = this.getImageUrl(id, 'person');

    return ({
      id,
      name,
      gender,
      birthYear: birth_year,
      eyeColor: eye_color,
      img,
    });
  }

  getIdFromUrl = (url) => pathParse(url).name;

  getImageUrl = (id, type) => {
    const imgBaseUrl = 'https://starwars-visualguide.com/assets/img';

    switch (type) {
      case ('person'):
        return `${imgBaseUrl}/characters/${id}.jpg`;
      case ('starship'):
        return `${imgBaseUrl}/starships/${id}.jpg`;
      case ('planet'):
        return `${imgBaseUrl}/planets/${id}.jpg`;
      default:
        return '';
    }
  };

  getPlanetsIds = async () => {
    const planets = await this.getPlanets();
    return planets.map(({ id }) => id);
  };
}
