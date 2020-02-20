import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
  const { leftElement, rightElement } = props;

  return (
    <div className="row">
      <div className="col col-4">
        {leftElement}
      </div>
      <div className="col col-8">
        {rightElement}
      </div>
    </div>
  );
};

Row.propTypes = {
  leftElement: PropTypes.node.isRequired,
  rightElement: PropTypes.node.isRequired,
}

export default Row;
