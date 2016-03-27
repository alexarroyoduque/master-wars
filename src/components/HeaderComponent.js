'use strict';

import React from 'react';

require('styles/Header.sass');

class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header-component">
        <header>
          <h1>MASTER Wars</h1>
          <div className="subtitle">
            <p>Created by <a href="http://alexarroyoduque.github.io/#/home" target="_blank">@AlexArroyoDuque</a> with <a href="https://facebook.github.io/react/React" target="_blank">React</a></p>
          </div>
        </header>
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
