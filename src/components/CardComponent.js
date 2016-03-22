'use strict';

import React from 'react';

require('styles/Card.sass');
        // <img src={this.props.hero.thumbnail.path + `.` + this.props.hero.thumbnail.extension}/>

class CardComponent extends React.Component {

  render() {
    return (
      <div className="card-component">
        <h1>{this.props.hero.name}</h1>
        <img src={`${this.props.hero.thumbnail.path}.${this.props.hero.thumbnail.extension}`}/>
        <dl>
          <dt>events</dt>
          <dd>{this.props.hero.events.available}</dd>
          <dt>series</dt>
          <dd>{this.props.hero.series.available}</dd>
          <dt>stories</dt>
          <dd>{this.props.hero.stories.available}</dd>
        </dl>
      </div>
    );
  }
}

CardComponent.displayName = 'CardComponent';

// Uncomment properties you need
CardComponent.propTypes = {
  hero: React.PropTypes.object
};
// CardComponent.defaultProps = {};

export default CardComponent;
