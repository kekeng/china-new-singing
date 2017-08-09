require('styles/MemberList.scss');
require('styles/App.scss');

import React from 'react';
import InputComponent from './Input.js'
import MemberItemComponent from './MemberItem.js'

let yiyiImage = require('../images/WechatIMG11.jpg');

class MemberListComponent extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    		bannerUrl: yiyiImage,
        totleMembers: 39,
        totleHot: 4000000,
        finishTime: 1500537523,
        members: ['校园赛区第七场资格赛网络人气12345678', '校园赛区第七场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第七场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第七场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678']
    }
	}
	contextTypes: {
    router: React.PropTypes.object
  }
  converTime() {
    var curTime = Date.parse(new Date()) / 1000;
    var deltaTime = this.state.finishTime - curTime;
    var second = deltaTime % 60;
    var min = parseInt(deltaTime / 60) % 60;
    var hour = parseInt(deltaTime / 3600) % 24;
    var day = parseInt(deltaTime / 86400)
    return day + '天' + hour + '时' + min + '分' + second + '秒';
  }
  render() {
    return (
      <div className="member-list-component">
       	<div className="banner">
       		<img src={this.state.bannerUrl}/>
       	</div>
        <div className="topinfo-layout">
          <div className="layout1">
           	<div className="input">
           		<InputComponent placeHolder="搜索学员"/>
           	</div>
            <div className="button margin-left-5">赛事直播</div>
          </div>
          <div className="layout2">
            <div className="info-layout">
              <div>
                <div className="info-txt margin-right-5">
                  选手:{this.state.totleMembers}
                </div>
                <div className="info-txt">
                  综合人气指数:{this.state.totleHot}
                </div>
              </div>
              <div className="info-txt margin-top-5">
                距离投票结束:{this.converTime()}
              </div>
            </div>
            <div className="button margin-left-5">活动说明</div>
          </div>
        </div>

        <div className="member-list">
          {this.state.members.map((it, index)=>{
            return (
              <MemberItemComponent key={index} index={index+1} name="名称" hot="12355"/>
            );
          })}
        </div>
       	
      </div>
    );
  }
}

MemberListComponent.defaultProps = {
};

export default MemberListComponent;
