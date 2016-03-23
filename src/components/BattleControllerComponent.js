'use strict';

import React from 'react';

require('styles/BattleController.sass');

class BattleControllerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBattlers: [],
      battleStarted: false,
      currentWinner: '-',
      scorePlayerOne: 0,
      scorePlayerTwo: 0
    };
    this.callback = this.callback.bind(this);
    this.battle = this.battle.bind(this);
    this.selectBattlers = this.selectBattlers.bind(this);
    this.eventsBattle = this.eventsBattle.bind(this);
    this.seriesBattle = this.seriesBattle.bind(this);
    this.storiesBattle = this.storiesBattle.bind(this);
    this.manageBattleScore = this.manageBattleScore.bind(this);
  }

  callback() {
    //http://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
    this.setState(
      {currentBattlers: [this.props.battlers.pop(), this.props.battlers.pop()]}, () => {
        this.setState({battleStarted: true});
        this.setState({currentWinner: '-'});
        this.props.selectBattlers();
      }
    );
  }

  selectBattlers() {
    return this.state.currentBattlers;
  }

  manageBattleScore(battleResult) {
    let newScore = 0;
    console.log(this.state.scorePlayerOne);
    if (battleResult === 'one') {
      newScore = this.state.scorePlayerOne;
      newScore++;
      this.setState({scorePlayerOne: newScore});
    } else if (battleResult === 'two') {
      newScore = this.state.scorePlayerTwo;
      newScore++;
      this.setState({scorePlayerTwo: newScore});
    }
  }

  battle(type) {
    let currentBattlers = this.state.currentBattlers,
        battleResult;
    if (currentBattlers[0][type].available > currentBattlers[1][type].available) {
      battleResult = 'one';
    } else if (currentBattlers[1][type].available > currentBattlers[0][type].available) {
      battleResult = 'two';
    } else {
      battleResult = 'draw';
    }

    this.manageBattleScore(battleResult);
    this.setState({battleStarted: false});
    return battleResult;
  }

  eventsBattle() {
    this.setState({currentWinner: this.battle('events')});
  }

  seriesBattle() {
    this.setState({currentWinner: this.battle('series')});
  }

  storiesBattle() {
    this.setState({currentWinner: this.battle('stories')});
  }

  render() {
    return (
      <div className="battlecontroller-component">
        <div>
          <div>
            <button disabled={this.props.battlers.length < 2 || this.state.battleStarted} onClick={this.callback}>Nuevos contrincantes {this.props.battlers.length}</button>
          </div>
          <div>
            <button disabled={!this.state.battleStarted} onClick={this.eventsBattle}>Retar a eventos</button>
            <button disabled={!this.state.battleStarted} onClick={this.seriesBattle}>Retar a series</button>
            <button disabled={!this.state.battleStarted} onClick={this.storiesBattle}>Retar a historias</button>
          </div>
          <div>
            <p>Player vencedor de la batalla actual: {this.state.currentWinner}</p>
          </div>
          <div>
            <p>Score Player 1: {this.state.scorePlayerOne}</p>
            <p>Score Player 2: {this.state.scorePlayerTwo}</p>
          </div>
        </div>
      </div>
    );
  }
}

BattleControllerComponent.displayName = 'BattleControllerComponent';

// Uncomment properties you need
BattleControllerComponent.propTypes = {
  battlers: React.PropTypes.array,
  selectBattlers: React.PropTypes.func
};
BattleControllerComponent.defaultProps = {};

export default BattleControllerComponent;
