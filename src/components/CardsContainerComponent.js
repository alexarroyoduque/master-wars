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
            return <li key={item.name}> <Card hero={item}/> </li>
          })}
        </ul>
        <p>myProp en cardsContainer: {this.props.myProp}</p>
      </div>
    );
  }
}

CardsContainerComponent.displayName = 'CardsContainerComponent';

// Uncomment properties you need
CardsContainerComponent.propTypes = {
  heroes: React.PropTypes.array,
  myProp: React.PropTypes.string
};
CardsContainerComponent.defaultProps = {
  heroes: [
   {name: 'Spiderman'},
   {name: 'Lobezno'}
  ]
};

export default CardsContainerComponent;
