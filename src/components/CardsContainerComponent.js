'use strict';

import React from 'react';
import Card from './CardComponent.js';

require('styles/CardsContainer.sass');

class CardsContainerComponent extends React.Component {
  render() {
    return (
      <div className='cardscontainer-component'>
        {this.props.characters.map(function(item) {
          return <div key={item.id}> <Card character={item}/> </div>
        })}
      </div>
    );
  }
}

CardsContainerComponent.displayName = 'CardsContainerComponent';

// Uncomment properties you need
CardsContainerComponent.propTypes = {
  characters: React.PropTypes.array
};
CardsContainerComponent.defaultProps = {
  characters: ['default1', 'default2']
};

export default CardsContainerComponent;
