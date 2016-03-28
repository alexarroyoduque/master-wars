'use strict';

import React from 'react';
import Q from 'q';

function shuffle(a) {
  return a.sort(function() {return Math.random() - 0.5});
}

function getSomeShuffleCollection(collection, amount = 22) {
  let some = shuffle(collection);
  some.length = amount
  return some;
}

var Client = require('node-rest-client').Client,
    client = new Client();

require('styles/ApiMarvel.sass');

class ApiMarvelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someCharacters: [],
      firstTime: true,
      loading: false,
      ready: false,
      error: false
    };
    this.getCharacters = this.getCharacters.bind(this);
  }

  getCharacters() {
    var deferred = Q.defer();
    this.setState({loading: true});
    this.setState({firstTime: false});
    this.setState({ready: false});
    this.setState({error: false});
    this.setState({someCharacters: []});
    this.getSomeCharacters();
    client
      .get('http://localhost:3000/marvel/characters/100', (response) => {
        this.setState({loading: false});
        if (!response.data) {
            this.setState({error: true});
        } else {
          console.log(response.data.results);
          this.setState({someCharacters: getSomeShuffleCollection(response.data.results)});
          this.setState({loading: false});
          this.setState({ready: true});
          this.props.getSomeCharacters();
        }
        deferred.resolve('promesa');
      })
      .on('error', function (err) {
        console.log('something went wrong on the request');
        deferred.reject(new Error(err));
      });

    return deferred.promise;
  }
  getSomeCharacters() {
    return this.state.someCharacters;
  }
  render() {
    return (
      <div className='apimarvel-component'>
        <div className='button-container'>
          <button className={!this.state.someCharacters.length ? ' button-animated' : ''} disabled={this.state.loading || !!this.state.someCharacters.length} onClick={this.getCharacters}>get heroes</button>
        </div>
        <div className='messages-bar'>
          <p aria-hidden={!this.state.firstTime}>Get heroes calling to MARVEL data base</p>
          <p aria-hidden={!this.state.loading}>Loading...</p>
          <p aria-hidden={!this.state.ready}>Ready for new battle</p>
          <p aria-hidden={!this.state.error}>Error... Call for new heroes again</p>
        </div>
      </div>
    );
  }
}

ApiMarvelComponent.displayName = 'ApiMarvelComponent';

// Uncomment properties you need
ApiMarvelComponent.propTypes = {
  getSomeCharacters: React.PropTypes.func
};
// ApiMarvelComponent.defaultProps = {};

export default ApiMarvelComponent;
