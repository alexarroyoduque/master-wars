require('normalize.css');
require('styles/App.css');

import React from 'react';
import ApiMarvel from './ApiMarvelComponent';
import BattleController from './BattleControllerComponent';
import CardsContainer from './CardsContainerComponent';
import Header from './HeaderComponent';

// let logo = require('../images/marvel.jpg');

function shuffle(a) {
  return a.sort(function() {return Math.random() - 0.5});
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCharacters: [],
      someCharacters: []
    };
    this.selectHeroesForBattle = this.selectHeroesForBattle.bind(this);
  }

  selectHeroesForBattle() {
    this.setState({selectedCharacters: this.refs.battleController.selectBattlers()});
  }

  setCharacters() {
    this.setState({someCharacters: shuffle(this.refs.apiMarvel.getSomeCharacters())});
  }

  // <img width="60px" src={logo} alt="Marvel" />

  render() {
    return (
      <div className="index">
        <Header/>
        <ApiMarvel ref="apiMarvel" getSomeCharacters={this.setCharacters.bind(this)}/>
        <BattleController ref="battleController" battlers={this.state.someCharacters} selectBattlers={this.selectHeroesForBattle.bind(this)}/>
        <CardsContainer characters={this.state.selectedCharacters}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
