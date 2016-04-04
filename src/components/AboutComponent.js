'use strict';

import React from 'react';

require('styles/About.sass');

class AboutComponent extends React.Component {
  render() {
    return (
      <div className='about-component'>
        <p>Source code on <a href='https://github.com/alexarroyoduque/master-wars' target='_blank' title='go to github'>{`AlexArroyoDuque's`} github</a></p>
      </div>
    );
  }
}

AboutComponent.displayName = 'AboutComponent';

// Uncomment properties you need
// AboutComponent.propTypes = {};
// AboutComponent.defaultProps = {};

export default AboutComponent;
