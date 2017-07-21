require('styles/MemberPage.scss');

import React from 'react';
import {browserHistory } from 'react-router'
import Slider from 'react-slick';

let yeomanImage = require('../images/yeoman.png');
let yiyiImage = require('../images/WechatIMG11.jpg');

var slides = [{
    background: require('../images/1.jpg'),
    link: "https://zhuangtongfa.github.io/"
  }, {
    background: require('../images/2.jpg'),
    link: "https://zhuangtongfa.github.io/"
  }, {
    background: require('../images/3.jpg'),
    link:"https://zhuangtongfa.github.io/"
  }];

class MemberPageComponent extends React.Component {
  render() {
  	var self = this;
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
          <div className="imgLayout"><img src={slides[0].background}/></div>
          <div className="imgLayout"><img src={slides[1].background}/></div>
          <div className="imgLayout"><img src={slides[2].background}/></div>
        </Slider>
        <div className="buttonLayout">
          <div className="button">按钮1</div>
          <div className="button">按钮2</div>
          <div className="button">按钮3</div>
        </div>
        
      </div>
    );
  }
}

MemberPageComponent.defaultProps = {
};

export default MemberPageComponent;
