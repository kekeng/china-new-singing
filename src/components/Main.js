require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import {browserHistory } from 'react-router'
import InputComponent from './Input.js'

let yeomanImage = require('../images/yeoman.png');
let yiyiImage = require('../images/WechatIMG11.jpg');

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    		banner_url: yiyiImage,
        news: ['校园赛区第七场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678']
    }
	}
	contextTypes: {
    router: React.PropTypes.object
  }
  render() {
  	var self = this;
    return (
      <div className="index">
       	<div className="banner">
       		<img src={this.state.banner_url}/>
       		<div className="bottom-text" onClick={
	       		() => {
	       			console.log("123");
    					//browserHistory.push('/aa');
    					//self.context.router.push(path);

    					fetch('test.html').then(response=>{
                console.log(response);
    						if(response.ok) {
                  console.log(response.json())
    							/*response.blob().then(myBlob=>{
    								var objectURL = URL.createObjectURL(myBlob);
    								console.log(objectURL);
    								console.log(yiyiImage);
    								self.setState({
    									banner_url: objectURL
    								});
    							})*/
    						}
    					});
	       		}}>
       			第二季《xxxx》广东赛区投票平台
       		</div>
       	</div>
       	<div className="input">
       		<InputComponent placeHolder="输入学员名称"/>
       	</div>
       	<div className="input">
       		<InputComponent placeHolder="输入赛区名称"/>
       	</div>

       	{this.state.news.map((it, index)=>{
       		return (
       			<div key={index} className="news-list" onClick={
            () => {
              browserHistory.push('/member-list');
            }}>
       				<img src={yeomanImage}/>
	       			{it}
	       		</div>
       		);
       	})}
       	
        <div className="bottom-bar">
        	<div className="btn right-border">
        		抽奖
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
