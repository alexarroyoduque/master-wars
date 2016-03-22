require('normalize.css');
require('styles/App.css');

import React from 'react';
import ApiMarvel from './ApiMarvelComponent';
import CardsContainer from './CardsContainerComponent';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: []
    };
  }

  setHeroes() {
    this.setState({heroes: this.refs.apiMarvel.myFunc()});
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <ApiMarvel ref="apiMarvel" heroes={this.state.heroes} myFunc={this.setHeroes.bind(this)}/>
        <CardsContainer heroes={this.state.heroes}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
