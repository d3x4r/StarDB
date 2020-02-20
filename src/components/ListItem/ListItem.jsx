import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ name, value }) => (
  <li className="list-group-item">
    { `${name}:` }
    {' '}
    { value }
  </li>
);

ListItem.defaultProps = {
  name: '',
  value: '',
};

ListItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
};

export default ListItem;
