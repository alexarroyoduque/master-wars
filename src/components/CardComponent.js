'use strict';

import React from 'react';

require('styles/Card.sass');

let CardComponent = (props) => (
  <div className="card-component">
    <p>Esto es una tarjeta</p>
  </div>
);

CardComponent.displayName = 'CardComponent';

// Uncomment properties you need
// CardComponent.propTypes = {};
// CardComponent.defaultProps = {};

export default CardComponent;
