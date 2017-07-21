require('styles/Input.scss');

import React from 'react';

let magnifierImage = require('../images/magnifier.png');

class InputComponent extends React.Component {
  render() {
    return (
      <div className="input-component">
       	<form className="form">
       		<input className="input-left" type="text" placeholder={this.props.placeHolder}/>
       		<div className="input-right">
       			<img src={magnifierImage}/>
       		</div>
       	</form>
      </div>
    );
  }
}

InputComponent.defaultProps = {
};

export default InputComponent;
