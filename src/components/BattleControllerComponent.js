'use strict';

import React from 'react';

require('styles/BattleController.sass');

let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class BattleControllerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBattlers: [],
      battleStarted: false,
      currentWinner: '-',
      scorePlayerOne: 0,
      scorePlayerTwo: 0,
      battleTypes: [
        {key: 'events', text: 'eventos'},
        {key: 'series', text: 'series'},
        {key: 'events', text: 'historias'}
      ],
      currentBattleType: {}
    };
    this.setNewBattlersCallback = this.setNewBattlersCallback.bind(this);
    this.selectBattlers = this.selectBattlers.bind(this);
    this.manageBattleScore = this.manageBattleScore.bind(this);
    this.setNewBattleType = this.setNewBattleType.bind(this);
  }

  setNewBattleType() {
    var indexBattle = getRandomInt(0, this.state.battleTypes.length - 1),
        battle = this.state.battleTypes[indexBattle];

    this.setState({currentBattleType: battle});
  }

  setNewBattlersCallback() {
    //http://stackoverflow.com/questions/30782948/why-calling-react-setstate-method-doesnt-mutate-the-state-immediately
    this.setState(
      {currentBattlers: [this.props.battlers.pop(), this.props.battlers.pop()]}, () => {
        this.setNewBattleType();
        this.setState({battleStarted: true});
        this.setState({currentWinner: '-'});
        this.props.selectBattlers();
      }
    );
  }

  selectBattlers() {
    return this.state.currentBattlers;
  }

  manageBattleScore(winner) {
    let newScore = 0;
    if (winner === 'player') {
      newScore = this.state.scorePlayerOne;
      newScore++;
      this.setState({scorePlayerOne: newScore});
    } else if (winner === 'machine') {
      newScore = this.state.scorePlayerTwo;
      newScore++;
      this.setState({scorePlayerTwo: newScore});
    }
  }

  fight(selectedHeroIndex) {
    let currentBattlers = this.state.currentBattlers,
        winnerHero,
        type = this.state.currentBattleType.key,
        winner = 'none';
    if (currentBattlers[0][type].available > currentBattlers[1][type].available) {
      winnerHero = 0;
    } else if (currentBattlers[1][type].available > currentBattlers[0][type].available) {
      winnerHero = 1;
    } else {
      winnerHero = 'none';
    }

    if (winnerHero !== 'hero') {
      if (selectedHeroIndex === winnerHero) {
        winner = 'player';
      } else {
        winner = 'machine';
      }
    }

    this.manageBattleScore(winner);
    this.setState({battleStarted: false});
    this.setState({currentBattleType: {}});
  }

  render() {
    return (
      <div className="battlecontroller-component">
        <div>
          <div>
            <button disabled={this.props.battlers.length < 2 || this.state.battleStarted} onClick={this.setNewBattlersCallback}>Nuevos contrincantes {this.props.battlers.length}</button>
          </div>
          <div>
            <p>¿Quien ha participado en más {this.state.currentBattleType.text || '...'}?</p>
            {this.state.currentBattlers.map((hero, index)=> {
              return <button disabled={!this.state.battleStarted} onClick={this.fight.bind(this, index)} key={hero.name}>{hero.name}</button>
            })}
          </div>
          <div>
            <p>Player vencedor de la batalla actual: {this.state.currentWinner}</p>
          </div>
          <div>
            <p>Player score: {this.state.scorePlayerOne}</p>
            <p>Beyonder score: {this.state.scorePlayerTwo}</p>
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
