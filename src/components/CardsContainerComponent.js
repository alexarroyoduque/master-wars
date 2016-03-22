'use strict';

import React from 'react';
import Card from './CardComponent.js';

require('styles/CardsContainer.sass');

class CardsContainerComponent extends React.Component {
  render() {
    return (
      <div className='cardscontainer-component'>
        <ul>
          {this.props.heroes.map(function(item) {
            return <li key={item.id}> <Card hero={item}/> </li>
          })}
        </ul>
      </div>
    );
  }
}

CardsContainerComponent.displayName = 'CardsContainerComponent';

// Uncomment properties you need
CardsContainerComponent.propTypes = {
  heroes: React.PropTypes.array
};
CardsContainerComponent.defaultProps = {
  heroes: ['default1', 'default2']
};

export default CardsContainerComponent;
