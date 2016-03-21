'use strict';

import React from 'react';

require('styles/Card.sass');

class CardComponent extends React.Component {

  render() {
    return (
      <div className="card-component">
        <p>Card</p>
      </div>
    );
  }
}

CardComponent.displayName = 'CardComponent';

// Uncomment properties you need
// CardComponent.propTypes = {};
// CardComponent.defaultProps = {};

export default CardComponent;
