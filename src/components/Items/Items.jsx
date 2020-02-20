import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';
import './Items.css';

const renderItems = (props) => {
  const {
    items,
    onClickHandler,
    selectedItemId,
    getLabel,
  } = props;

  return items.map((item) => {
    const { id } = item;
    const defaulClassName = 'list-group-item list-group-item-action';
    const itemClassName = selectedItemId === id ? `${defaulClassName} active` : defaulClassName;
    const label = getLabel(item);
    return (
      <a
        href="/#"
        className={itemClassName}
        key={id}
        onClick={onClickHandler(id)}
      >
        {label}
      </a>
    );
  })
};

const Items = (props) => {
  const { items } = props;

  return (
    <section className="block">
      <div className="list-group">
        {items ? renderItems(props) : <Spinner />}
      </div>
    </section>
  );
};

Items.defaultProps = {
  items: [],
}

Items.propTypes = {
  items: PropTypes.instanceOf(Array),
};

export default Items;
