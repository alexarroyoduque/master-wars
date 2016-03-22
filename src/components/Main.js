require('normalize.css');
require('styles/App.css');

import React from 'react';
import ApiMarvel from './ApiMarvelComponent';
import CardsContainer from './CardsContainerComponent';

let yeomanImage = require('../images/yeoman.png');

function shuffle(a) {
  return a.sort(function() {return Math.random() - 0.5});
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHeroes: [],
      someHeroes: []
    };
    this.selectHeroesForBattle = this.selectHeroesForBattle.bind(this);
  }

  selectHeroesForBattle() {
    this.setState({selectedHeroes: [this.state.someHeroes.pop(), this.state.someHeroes.pop()]});
  }

  setHeroes() {
    this.setState({someHeroes: shuffle(this.refs.apiMarvel.myFunc())});
    this.selectHeroesForBattle();
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <ApiMarvel ref="apiMarvel" heroes={this.state.selectedHeroes} myFunc={this.setHeroes.bind(this)}/>
        <button disabled={this.state.someHeroes.length < 2} onClick={this.selectHeroesForBattle}>Nuevos contrincantes {this.state.someHeroes.length}</button>
        <div>
          <button disabled={!this.state.someHeroes.length}>Retar a eventos</button>
          <button disabled={!this.state.someHeroes.length}>Retar a series</button>
          <button disabled={!this.state.someHeroes.length}>Retar a historias</button>
        </div>
        <CardsContainer heroes={this.state.selectedHeroes}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
