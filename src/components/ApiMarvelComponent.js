'use strict';

import React from 'react';
import Q from 'q';

var Client = require('node-rest-client').Client,
    client = new Client();

require('styles/ApiMarvel.sass');

class ApiMarvelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hero1: '-',
      hero2: '-'
    };
    this.getHeroes = this.getHeroes.bind(this);
    // this.callBack = this.callBack.bind(this);
  }

  getHeroes() {
    var deferred = Q.defer();
    client
      .get('http://localhost:3000/marvel', (response) => {
        console.log(response.data.results);
        this.setState({hero1: response.data.results[0]});
        this.setState({hero2: response.data.results[1]});
        this.props.myFunc();
        deferred.resolve('promesa');
      })
      .on('error', function (err) {
        console.log('something went wrong on the request');
        deferred.reject(new Error(err));
      });

    return deferred.promise;
  }
  // callBack() {
  //   this.props.myFunc();
  // }
  myFunc() {
    return [this.state.hero1, this.state.hero2];
  }
  render() {
    return (
      <div className='apimarvel-component'>
        <button onClick={this.getHeroes}>Llamar a la api</button>
        <pre>Hero 1: {this.state.hero1.name}</pre>
        <pre>Hero 2: {this.state.hero2.name}</pre>
      </div>
    );
  }
}

ApiMarvelComponent.displayName = 'ApiMarvelComponent';

// Uncomment properties you need
ApiMarvelComponent.propTypes = {
  myFunc: React.PropTypes.func
};
// ApiMarvelComponent.defaultProps = {};

export default ApiMarvelComponent;
