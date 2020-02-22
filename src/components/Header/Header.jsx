/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

class Header extends Component {
  state = {
    links: [
      {
        name: 'People',
        target: '/people/',
        active: false,
      },
      {
        name: 'Planets',
        target: '/planets/',
        active: false,
      },
      {
        name: 'Starships',
        target: '/starships/',
        active: false,
      },
    ],
  }

  onClickHandler = ({ target }) => {
    const { links } = this.state;
    const targetLinkName = target.dataset.name;

    const updatedState = links.map((link) => {
      const { name } = link;
      if (name === targetLinkName) {
        return { ...link, active: true };
      }
      return { ...link, active: false };
    });

    this.setState({ links: updatedState });
  };

  renderButtons = () => {
    const { links } = this.state;
    return links.map(({ target, name, active }) => {
      const classNames = cn({
        'nav-item': true,
        active,
      });
      return <li className={classNames} key={name}><Link className="nav-link" to={target} data-name={name} onClick={this.onClickHandler}>{name}</Link></li>;
    });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">Star DB</Link>

        <div>
          <ul className="navbar-nav mr-auto">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
