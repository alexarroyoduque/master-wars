'use strict';

import React from 'react';
import Card from './CardComponent.js';

require('styles/CardsContainer.sass');

class CardsContainerComponent extends React.Component {
  render() {
    return (
      <div className='cardscontainer-component'>
        <ul>
          {this.props.characters.map(function(item) {
            return <li key={item.id}> <Card character={item}/> </li>
          })}
        </ul>
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
