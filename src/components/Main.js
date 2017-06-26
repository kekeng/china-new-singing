require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
       	
        <div className="bottom_bar">
        	<div className="btn">
        	<a>抽奖</a>
        		
        	</div>
        	<div className="btn">
        		我的
        	</div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
