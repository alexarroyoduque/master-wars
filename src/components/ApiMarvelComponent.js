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
    this.addClassByState = this.addClassByState.bind(this);
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
      .get('http://localhost:3000/marvel/characters', (response) => {
      // .get(`${window.location.origin}/marvel/characters`, (response) => { // uncomment for dist
        this.setState({loading: false});
        if (!response.length) {
            this.setState({error: true});
        } else {
          // console.log(response);
          this.setState({someCharacters: getSomeShuffleCollection(response)});
          this.setState({loading: false});
          this.setState({ready: true});
          this.props.getSomeCharacters();
        }
        deferred.resolve('promesa');
      })
      .on('error', function (err) {
        this.setState({error: true});
        this.setState({loading: false});
        deferred.reject(new Error(err));
      });

    return deferred.promise;
  }
  getSomeCharacters() {
    return this.state.someCharacters;
  }
  addClassByState() {
    if (!this.state.someCharacters.length && !this.state.loading) {
      return 'animation-shake';
    } else if (this.state.loading) {
      // console.log('cargando');
      return 'animation-loading';
    } else {
      return '';
    }
  }
  render() {
    return (
      <div className={`apimarvel-component ${this.props.visibility}`}>
        <div className='button-container'>
          <button className={this.addClassByState()} disabled={this.state.loading || !!this.state.someCharacters.length} onClick={this.getCharacters}>get heroes</button>
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
  visibility: React.PropTypes.string,
  getSomeCharacters: React.PropTypes.func
};
// ApiMarvelComponent.defaultProps = {};

export default ApiMarvelComponent;
