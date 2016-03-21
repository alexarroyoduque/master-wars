'use strict';

import React from 'react';

var Client = require('node-rest-client').Client,
    client = new Client();

require('styles/ApiMarvel.sass');

class ApiMarvelComponent extends React.Component {
  handleClick() {
    client.get('http://localhost:3000/marvel', (data) => {
      console.log(data);
    });
  }
  render() {
    return (
      <div className='apimarvel-component'>
        <button onClick={this.handleClick}>Llamar</button>
      </div>
    );
  }
}

ApiMarvelComponent.displayName = 'ApiMarvelComponent';

// Uncomment properties you need
// ApiMarvelComponent.propTypes = {};
// ApiMarvelComponent.defaultProps = {};

export default ApiMarvelComponent;
