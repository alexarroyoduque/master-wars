'use strict';

import React from 'react';
import WebAnimations from 'web-animations-js';

require('styles//BattleConclusion.sass');

var element;
class BattleConclusionComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  showConclusion() {
    element = document.querySelector('.battleconclusion-component');
    element.animate([
        {opacity: 0, transform: 'scale(0.1)'},
        {opacity: 1, transform: 'scale(0.8)'},
        {opacity: 1.0, transform: 'scale(1)'},
        {opacity: 0, transform: 'scale(0.9)'}
    ], {
        duration: 2600,
        fill: 'forwards',
        easing: 'cubic-bezier(0.15, 0.87, 0.65, 0.59)'
    });
  }

  getWinText() {
    if (this.props.winner === 'player') {
      return 'You win!';
    } else if (this.props.winner === 'machine') {
      return 'You lose';
    } else {
      return 'Draw';
    }
  }
  render() {
    return (
      <div className='battleconclusion-component'>
        {this.getWinText()}
      </div>
    );
  }
}

BattleConclusionComponent.displayName = 'BattleConclusionComponent';

// Uncomment properties you need
BattleConclusionComponent.propTypes = {
  winner: React.PropTypes.string
};
BattleConclusionComponent.defaultProps = {
  winner: 'defecto'
};

export default BattleConclusionComponent;
