require('styles/Apply.scss');
require('styles/App.scss');

import React from 'react';
import {browserHistory } from 'react-router'
import Modal from 'react-modal'

let redBg = require('../images/red_bg.jpg');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width               : '50%'
  }
};

class ApplyComponent extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
    		area: [{value: 'chaozhou', label: '潮州赛区'}, {value: 'shantou', label: '汕头赛区'}],
        selectArea: '',
        num: 0,
        isResultPage: false,
        modalIsOpen: false,
        modalText: ''
    }

    document.body.style.backgroundImage = 'url(' + redBg + ')';

    this.doApply = this.doApply.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}
	contextTypes: {
    router: React.PropTypes.object
  }
  componentWillUnmount() {
    document.body.style.backgroundImage = '';
  }
  doApply() {
    //console.log("saiqu = ", this.refs.areaSelect.value);
    if(this.refs.name.value.length == 0) {
      this.setState({
        modalText: '请输入姓名!'
      });
      this.openModal();
    } else if(this.refs.phone.value.length == 0 || this.refs.phone.value.length != 11) {
      this.setState({
        modalText: '请输入准确的手机号码!'
      });
      this.openModal();
    } else if(this.refs.idCard.value.length == 0 || this.refs.idCard.value.length != 18) {
      this.setState({
        modalText: '请输入准确的身份证号码!'
      });
      this.openModal();
    } else {
      this.setState({
        selectArea: this.refs.areaSelect.value,
        isResultPage: true,
        num: 101
      });
    }
  }
  openModal() {
    //this.setState({modalIsOpen: true});
    confirm('123');
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  onChange1(value, selectedOptions) {
  console.log(value, selectedOptions);
}
  render() {
    let infoClass;
    let nameClass;
    let disabled;
    let btnText;
    if(this.state.isResultPage) {
      infoClass = 'input result';
      nameClass = 'info-line';
      disabled = 'disabled';
      btnText = '报名成功';
    } else {
      infoClass = 'input';
      nameClass = 'info-line top-text-margin';
      disabled = '';
      btnText = '点击报名';
    }
    return (
      <div className="apply-component crossCenterH">
       	<div className="title">第二季 中国新歌声</div>
        <div className="title">全国全国全国全国全国</div>

        { this.state.isResultPage ?
          <div className="info-line top-text-margin">
            <div className="text centerV">NO:</div>
            <input ref="num" value={this.state.num} className={infoClass} type="text" disabled={disabled}/>
          </div>
          : null
        }
        
        <div className={nameClass}>
          <div className="text centerV">姓名:</div>
          <input ref="name" className={infoClass} type="text"  disabled={disabled}/>
        </div>
        <div className="info-line">
          <div className="text centerV">手机号码:</div>
          <input ref="phone" className={infoClass} type="text"  disabled={disabled}/>
        </div>
        <div className="info-line">
          <div className="text centerV">赛区:</div>
          { this.state.isResultPage ?
            <input ref="areaInput" value={this.state.selectArea} className={infoClass} type="text"  disabled={disabled}/>
            : <select ref="areaSelect">
                {this.state.area.map((it, index) => {
                  return (<option key={index} value={it.value}>{it.label}</option>);
                })}
              </select>
          }
          
        </div>
        <div className="info-line">
          <div className="text centerV">身份证号码:</div>
          <input ref="idCard" className={infoClass} type="text"  disabled={disabled}/>
        </div>

        <div className="button center" onClick={
          () => {
            if(this.state.isResultPage) {
              browserHistory.push('/');
            } else {
              this.doApply();
            }
          }
        }>{btnText}</div>

        <Modal isOpen={this.state.modalIsOpen} style={customStyles} contentLabel="Modal">
          <div className="crossCenterH">
            <div className="modal-content">{this.state.modalText}</div>
            <button className="modal-button" onClick={this.closeModal}>好的</button>
          </div>
        </Modal>
       	
      </div>
    );
  }
}

ApplyComponent.defaultProps = {
};

export default ApplyComponent;
