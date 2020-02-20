import React from 'react';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="/#">Star DB</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarColor02">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/#">
            People
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">Planets</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">Starships</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;
