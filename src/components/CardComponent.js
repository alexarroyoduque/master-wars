'use strict';

import React from 'react';

require('styles/Card.sass');

class CardComponent extends React.Component {

  render() {
    return (
      <div className="card-component">
        <h1>{this.props.character.name}</h1>
        <img src={`${this.props.character.thumbnail.path}.${this.props.character.thumbnail.extension}`}/>
        <dl>
          <dt>events</dt>
          <dd>{this.props.character.events.available}</dd>
          <dt>series</dt>
          <dd>{this.props.character.series.available}</dd>
          <dt>stories</dt>
          <dd>{this.props.character.stories.available}</dd>
        </dl>
      </div>
    );
  }
}

CardComponent.displayName = 'CardComponent';

// Uncomment properties you need
CardComponent.propTypes = {
  character: React.PropTypes.object
};
// CardComponent.defaultProps = {};

export default CardComponent;
