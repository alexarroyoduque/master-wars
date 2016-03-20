'use strict';

import React from 'react';

var createFragment = require('react-addons-create-fragment');

require('styles/CardsContainer.sass');

let CardsContainerComponent = (props) => (
  <div className='cardscontainer-component'>
    <ul>
      {props.heroes.map(function(item) {
        return <li key={item.name}>{item.name}</li>
      })}
    </ul>
    <p>fin</p>
  </div>
);

CardsContainerComponent.displayName = 'CardsContainerComponent';

// Uncomment properties you need
CardsContainerComponent.propTypes = {
  name: React.PropTypes.string,
  heroes: React.PropTypes.array
};
CardsContainerComponent.defaultProps = {
  heroes: [
   {name: 'Spiderman'},
   {name: 'Lobezno'}
  ]
};

export default CardsContainerComponent;
