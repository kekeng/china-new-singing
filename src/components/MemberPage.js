require('styles/MemberPage.scss');

import React from 'react';
import {browserHistory } from 'react-router'
import Slider from 'react-slick';

let yeomanImage = require('../images/yeoman.png');

var slides = [{
    background: require('../images/1.jpg'),
    link: 'https://zhuangtongfa.github.io/'
  }, {
    background: require('../images/2.jpg'),
    link: 'https://zhuangtongfa.github.io/'
  }, {
    background: require('../images/3.jpg'),
    link: 'https://zhuangtongfa.github.io/'
  }];

class MemberPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        news: ['校园赛区第七场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678', '校园赛区第八场资格赛网络人气12345678']
    }
  }
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      arrows: false,
      autoplay: false,
      useCSS: false
    };
    return (
      <div className="member-page-component">
        <Slider {...settings}>
          <div className="img-layout"><img src={slides[0].background}/></div>
          <div className="img-layout"><img src={slides[1].background}/></div>
          <div className="img-layout"><img src={slides[2].background}/></div>
        </Slider>
        <div className="button-layout">
          <div className="button">按钮1</div>
          <div className="button">按钮2</div>
          <div className="button">按钮3</div>
        </div>
        <div className="name-line">{this.props.params.area} - {this.props.params.memberName}</div>
        <div className="function-layout">
          <div className="button">送话筒</div>
          <div className="button">送礼物</div>
          <div className="button">投票</div>
          <div className="button">排名</div>
        </div>
        <div className="bottom-info">
          <div className="info-layout">
            <div className="info">人气值：123456</div>
            <div className="info">姓名：我勒个去</div>
            <div className="info">人气排名：1234</div>
          </div>
          <div className="info-layout">
            <div className="info">说明：</div>
          </div>
          {this.state.news.map((it, index)=>{
            return (
              <div key={index} className="news-list">
                <img src={yeomanImage}/>
                {it}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

MemberPageComponent.defaultProps = {
};

export default MemberPageComponent;
