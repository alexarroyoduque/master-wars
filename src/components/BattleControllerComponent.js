'use strict';

import React from 'react';
import BattleConclusion from './BattleConclusionComponent';

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
      playerHasAnswered: false,
      currentWinner: '-',
      scorePlayerOne: 0,
      scorePlayerTwo: 0,
      scoreDraw: 0,
      battleTypes: [
        {key: 'events', text: 'events'},
        {key: 'series', text: 'series'},
        {key: 'events', text: 'stories'}
      ],
      currentBattleType: {}
    };
    this.setNewBattlersCallback = this.setNewBattlersCallback.bind(this);
    this.selectBattlers = this.selectBattlers.bind(this);
    this.manageBattleScore = this.manageBattleScore.bind(this);
    this.setNewBattleType = this.setNewBattleType.bind(this);
    this.addHighlightClass = this.addHighlightClass.bind(this);
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
        this.setState({playerHasAnswered: false});
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
    } else {
      newScore = this.state.scoreDraw;
      newScore++;
      this.setState({scoreDraw: newScore});
    }
  }

  fight(selectedHeroIndex) {
    let currentBattlers = this.state.currentBattlers,
        winnerHero,
        type = this.state.currentBattleType.key,
        winner = 'draw';
    if (currentBattlers[0][type].available > currentBattlers[1][type].available) {
      winnerHero = 0;
    } else if (currentBattlers[1][type].available > currentBattlers[0][type].available) {
      winnerHero = 1;
    } else {
      winnerHero = 'draw';
    }

    if (winnerHero !== 'draw') {
      if (selectedHeroIndex === winnerHero) {
        winner = 'player';
      } else {
        winner = 'machine';
      }
    } else {
      winner = 'draw';
    }

    this.setState({currentWinner: winner});
    this.setState({playerHasAnswered: true});
    this.refs.battleConclusion.showConclusion();
    this.manageBattleScore(winner);
    setTimeout(()=>{
      this.setState({battleStarted: false});
    }, 1800);
  }

  addHighlightClass(){
    if (!this.state.playerHasAnswered) {
      return ' animation-highlight';
    }
  }

  render() {
    return (
      <div className={`battlecontroller-component ${this.props.visibility}`}>
        <div className="player-actions">
          <div className="button-container">
            <button className={this.props.battlers.length > 2 && !this.state.battleStarted ? ' animation-shake' : ''} disabled={this.props.battlers.length < 2 || this.state.battleStarted} onClick={this.setNewBattlersCallback}>New Battle {this.props.battlers.length}</button>
          </div>
          <div className="score-container">
            <table>
              <thead>
                <tr>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th className="draw">Draw</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.scorePlayerOne}</td>
                  <td>{this.state.scorePlayerTwo}</td>
                  <td className="draw">{this.state.scoreDraw}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className={!this.state.currentBattleType.text ? 'question hidden' : 'question'}>
            <p>Who has participated in more <span className='battle-type'>{this.state.currentBattleType.text || '...'}</span>?</p>
          </div>
          {this.state.currentBattlers.map((hero, index)=> {
            return <button className={`hero-${index} ${this.addHighlightClass()}`} disabled={this.state.playerHasAnswered} onClick={this.fight.bind(this, index)} key={hero.name}>{hero.name}</button>
          })}
        </div>
        <BattleConclusion ref="battleConclusion" winner={this.state.currentWinner}/>
      </div>
    );
  }
}

BattleControllerComponent.displayName = 'BattleControllerComponent';

// Uncomment properties you need
BattleControllerComponent.propTypes = {
  visibility: React.PropTypes.string,
  battlers: React.PropTypes.array,
  selectBattlers: React.PropTypes.func
};
BattleControllerComponent.defaultProps = {};

export default BattleControllerComponent;
