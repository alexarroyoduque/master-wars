'use strict';

import React from 'react';


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
    this.callBack = this.callBack.bind(this);
  }
  getHeroes() {
    client.get('http://localhost:3000/marvel', (response) => {
      console.log(response.data.results);
      this.setState({hero1: response.data.results[0].name});
      this.setState({hero2: response.data.results[1].name});
    });
  }
  callBack() {
    this.props.myFunc();
  }
  myFunc() {
    console.log('myFunc');
    var a = Math.random() + '';
    console.log(a);
    return a;
  }
  render() {
    return (
      <div className='apimarvel-component'>
        <button onClick={this.getHeroes}>Llamar a la api</button>
        <button onClick={this.callBack}>Probar callback</button>
        <pre>Hero 1: {this.state.hero1}</pre>
        <pre>Hero 2: {this.state.hero2}</pre>
        <pre>myProp: {this.props.myProp}</pre>
      </div>
    );
  }
}

ApiMarvelComponent.displayName = 'ApiMarvelComponent';

// Uncomment properties you need
ApiMarvelComponent.propTypes = {
  myFunc: React.PropTypes.func,
  myProp: React.PropTypes.string
};
// ApiMarvelComponent.defaultProps = {};

export default ApiMarvelComponent;
