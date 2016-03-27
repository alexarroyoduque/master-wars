'use strict';

import React from 'react';

require('styles/Header.sass');

class HeaderComponent extends React.Component {
  render() {
    return (
      <div className="header-component">
        <header>
          <h1>Master wars</h1>
          <div className="subtitle">
            <p>Welcome to the most epic MARVEL battle </p>
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
