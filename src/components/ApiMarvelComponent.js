'use strict';

import React from 'react';
import Q from 'q';
const crypto = require('crypto');


function generateHash(ts, privateKey, apiKey) {
  const hash = crypto.createHash('md5').update(ts + privateKey + apiKey).digest('hex');
  return hash;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
  return a.sort(function() {return Math.random() - 0.5});
}

function getSomeShuffleCollection(collection, amount = 20) {
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

  generateUrl(limit) {
    const base = 'http://gateway.marvel.com/v1/public/characters?',
      apiKey = '04bbc7aed211dea82a9012da2d8c3582',
      total = 1485 - limit,
      offset = getRandomInt(1, total),
      privateKey = '2a5bcb9d808a7f3173bfa17b926ac8664a3e6e32',
      ts = new Date().getTime(),
      hash = generateHash(ts, privateKey, apiKey),
      url = `${base}limit=${limit}&offset=${offset}&apikey=${apiKey}&ts=${ts}&hash=${hash}`;
      // console.log('url');
      // console.log(url);
    return url;
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
      // .get('http://localhost:3000/marvel/characters', (response) => { // uncomment to use proxy
      .get(this.generateUrl(22), (response) => { // uncomment to call api directly
        let characters = response.data.results;
        this.setState({loading: false});
        if (!characters.length) {
            this.setState({error: true});
        } else {
          this.setState({someCharacters: getSomeShuffleCollection(characters)});
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
