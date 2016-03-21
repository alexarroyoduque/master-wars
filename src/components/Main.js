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
      propA: 'a',
      propB: 'b'
    };
  }

  siblingAFunc(arg) {
    this.setState({propA: this.refs.apiMarvel.myFunc()});
  }

  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <ApiMarvel ref="apiMarvel" myProp={this.state.propA} myFunc={this.siblingAFunc.bind(this)}/>
        <CardsContainer myProp={this.state.propA}/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
