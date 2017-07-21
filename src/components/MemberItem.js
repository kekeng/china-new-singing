require('styles/MemberItem.scss');

import React from 'react';
import {browserHistory } from 'react-router'

let yeomanImage = require('../images/yeoman.png');

class MemberItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLayoutLen: (window.innerWidth-10*2) * 0.48
    }
  }
  render() {
    return (
      <div className="member-item-component">
        <div className="img-layout" ref="imgLayout" style={{width:this.state.imgLayoutLen, height:this.state.imgLayoutLen}} onClick={
          () => {
            browserHistory.push('/member-page');
          }}>
          <img src={yeomanImage}/>
          <div className="bottom-text">广州赛区</div>
          <div className="triangle" />
          <div className="triangle-content">{this.props.index}</div>
        </div>
        <div className="txt">学员：{this.props.name}</div>
        <div className="txt">人气值：{this.props.hot}</div>
      </div>
    );
  }
}

MemberItemComponent.defaultProps = {
};

export default MemberItemComponent;