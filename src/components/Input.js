require('styles/Input.scss');

import React from 'react';

class InputComponent extends React.Component {
  render() {
    return (
      <div className="input-component">
       	<form className="form">
       		<input className="input" type="text" placeholder={this.props.placeHolder}/>
       	</form>
      </div>
    );
  }
}

InputComponent.defaultProps = {
};

export default InputComponent;
