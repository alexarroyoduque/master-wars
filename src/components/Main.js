require('normalize.css');
require('styles/App.css');

import React from 'react';
import ApiMarvel from './ApiMarvelComponent';
import BattleController from './BattleControllerComponent';
import CardsContainer from './CardsContainerComponent';

let yeomanImage = require('../images/yeoman.png');

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

    // this.setState({selectedCharacters: [this.state.someCharacters.pop(), this.state.someCharacters.pop()]});
  }

  setCharacters() {
    this.setState({someCharacters: shuffle(this.refs.apiMarvel.getSomeCharacters())});
    // this.selectHeroesForBattle();
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">
          <h1> Welcome to the most epic MARVEL battle </h1>
          <small>Do you know every hero of MARVEL? Show me everything you know</small>
        </div>
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
