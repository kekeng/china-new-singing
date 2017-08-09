require('styles/NewApply.scss');
require('styles/App.scss');
//import 'antd/dist/antd.css';
import 'cropperjs/dist/cropper.css';

import React from 'react';
import {browserHistory } from 'react-router'
import { Spin, Modal, Upload, Icon } from 'antd';
import Cropper from 'react-cropper';
import config from 'config';

class NewApplyComponent extends React.Component {
  //上传头像控件返回promise的reject回调
  uploadReject;
  //上传头像控件返回promise的resolve回调
  uploadResolve;
  //上传头像剪裁后blob
  avatarBlob;

	constructor(props) {
		super(props);
    this.state = {
      topImgUrl: '',
      area: [], //[{id: '1234567890', orgName: '广东赛区', children: [{id: '1234567890', orgName: '潮州赛区'}, {id: '1234567890', orgName: '汕头赛区'}]}],
      sex: [], //[{key: 'MALE', name: '男', value: '1'}, {key:'FEMALE', name: '女', value: '0'}],
      profession: [], //[{key: 'SINGER', name: '歌手', value: '01'}, {key:'STUDENT', name: '学生', value: '02'}],
      selectArea1: 0,
      selectArea2: 0,
      selectSex: '',
      selectProfession: '',
      num: 0,
      isResultPage: false,
      showLoading: false,
      showImgCropper: false,
      avatarUrl: '',//缩略图用
      avatarTmpUrl: '',//剪裁用
      avatarOnlineUrl: '',//上传头像返回值
      toast: ''
    }

    this.doApply = this.doApply.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
    this.showToast = this.showToast.bind(this);
    this.hideToast = this.hideToast.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.upload = this.upload.bind(this);
	}
  componentDidMount() {
    //获取报名信息
    this.showLoading();
    var formData = new FormData();
    formData.append('activityId', this.props.params.id);
    fetch(config.getApplyInfo, {mode: 'cors', method: 'POST', body: formData}).then(response=>{
      console.log('response ', response);
      if(response.ok) {
        response.json().then(data=>{
          console.log('data ', data);
          this.setState({
            topImgUrl: data.activityLogo,
            sex: data.gender,
            profession: data.occupation,
            area: data.orgs
          });
        });
      }
      this.hideLoading();
    });
  }

  /**
  上传头像控件-选择文件回调
  返回true则执行上传，false则不则行，也可返回promise
  */
  beforeUpload(file, fileList) {
    //文件格式不对
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      this.showToast('请选择图片!');
      return false;
    }

    var uploadPromise = new Promise((resolve, reject) => {
      var objectUrl =  window.URL.createObjectURL(file);
      this.setState({
        avatarTmpUrl: objectUrl,
        showImgCropper: true
      });

      //记录promise的resolve和reject回调
      this.uploadReject = reject;
      this.uploadResolve = resolve;
    });

    return uploadPromise;
  }

  /**
  报名
  */
  doApply() {
    if(this.refs.name.value.length == 0) {
      this.showToast('请输入姓名!');
    } else if(this.refs.phone.value.length == 0 || this.refs.phone.value.length != 11) {
      this.showToast('请输入准确的手机号码!');
    } else if(this.refs.idCard.value.length == 0 || this.refs.idCard.value.length != 18) {
      this.showToast('请输入准确的身份证号码!');
    } else if(this.refs.work.value.length == 0) {
      this.showToast('请输入工作单位/学校名称!');
    } else if(this.state.avatarOnlineUrl.length == 0) {
      this.showToast('请上传头像!');
    } else {
      var formData = new FormData();
      formData.append('activityId', this.props.params.id);
      formData.append('playerName', this.refs.name.value);
      formData.append('playerGender', this.refs.sexSelect.value);
      formData.append('playerTel', this.refs.phone.value);
      formData.append('playerIdCard', this.refs.idCard.value);
      formData.append('company', this.refs.work.value);
      formData.append('occupation', this.refs.professionSelect.value);
      formData.append('profileImageUrl', this.state.avatarOnlineUrl);
      formData.append('orgId', this.refs.areaSelect2.value);
      var that = this;
      this.showLoading();
      fetch(config.apply, {mode: 'cors', method: 'POST', body: formData}).then(response=>{
        console.log('apply ', response);
        if(response.ok) {
          response.json().then(data=>{
            console.log('apply data ', data);
            console.log('sex = ', this.refs.sexSelect);
            if(data.result == '1') {//success
              this.setState({
                selectSex: this.refs.sexSelect.text,
                selectArea: data.mo.orgName,
                selectProfession: this.refs.professionSelect.text,
                isResultPage: true,
                num: data.mo.playerNo
              });
            } else {
              that.showToast(data.errMsgs[0]);
            }
          });
        }
        that.hideLoading();
      });
    }
  }

  showLoading() {
    this.setState({showLoading: true});
  }
  hideLoading() {
    this.setState({showLoading: false});
  }

  showToast(msg) {
    this.setState({toast: msg});
    setTimeout(
      () => {
          this.hideToast();
      },
      1000
    );
  }
  hideToast() {
    this.setState({toast: ''});
  }

  /**
  上传头像
  */
  upload() {
    var formData = new FormData();
    formData.append('file', this.avatarBlob);

    this.showLoading();
    fetch(config.uploadAvatar, {mode: 'cors', method: 'POST', body: formData}).then(response=>{
      if(response.ok) {
        response.json().then(data=>{
          this.setState({
            avatarOnlineUrl: data.fileUrl
          });
        });
      } else {
        this.setState({
          avatarUrl: null
        });
      }
      this.hideLoading();
    });
  }

  render() {
    let nameClass;
    let disabled;
    let btnText;
    let btnClass;
    if(this.state.isResultPage) {
      nameClass = 'info-line';
      disabled = 'disabled';
      btnText = '报名成功';
      btnClass = 'ensure-button center'
    } else {
      nameClass = 'info-line top-text-margin';
      disabled = '';
      btnText = '点击报名';
      btnClass = 'apply-button center'
    }
    return (
      <div className="new-apply-component crossCenterH">
        <img className="top-img" src={this.state.topImgUrl}/>
       	<div className="title">
          报&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          通&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          道</div>

        { this.state.isResultPage ?
          <div className="info-line top-text-margin">
            <div className="text centerV">NO</div>
            <input ref="num" value={this.state.num} className="input" type="text" disabled={disabled}/>
          </div>
          : null
        }

        <div className={nameClass}>
          <div className="text centerV">学员姓名</div>
          <input ref="name" className="input" type="text"  disabled={disabled}/>
        </div>

        <div className="info-line">
          <div className="text centerV">学员性别</div>
          { this.state.isResultPage ?
            <input ref="sexInput" value={this.state.selectSex} className="input" type="text"  disabled={disabled}/>
            : <select ref="sexSelect">
                {this.state.sex.map((it, index) => {
                  return (<option key={index} value={it.value}>{it.name}</option>);
                })}
              </select>
          }
        </div>

        <div className="info-line">
          <div className="text centerV">手机号码</div>
          <input ref="phone" className="input" type="text"  disabled={disabled}/>
        </div>

        <div className="info-line">
          <div className="text centerV">身份证号</div>
          <input ref="idCard" className="input" type="text"  disabled={disabled}/>
        </div>

        <div className="info-line centerV">
          <div className="text centerV">工作单位/<br />学校名称</div>
          <input ref="work" className="input" type="text"  disabled={disabled}/>
        </div>

        <div className="info-line">
          <div className="text centerV">从事职业</div>
          { this.state.isResultPage ?
            <input ref="professionInput" value={this.state.selectProfession} className="input" type="text"  disabled={disabled}/>
            : <select ref="professionSelect">
                {this.state.profession.map((it, index) => {
                  return (<option key={index} value={it.value}>{it.name}</option>);
                })}
              </select>
          }
        </div>

        <div className="info-line">
          <div className="text centerV">所在赛区</div>
          { this.state.isResultPage ?
            <input ref="areaInput" value={this.state.selectArea} className="input" type="text"  disabled={disabled}/>
            : (
                this.state.area.length > 0 ?
                <div>
                  <select ref="areaSelect1">
                    {this.state.area.map((it, index) => {
                      return (<option key={index} value={it.id}>{it.orgName}</option>);
                    })}
                  </select>
                  <select className="margin-left-5" ref="areaSelect2">
                    {this.state.area[this.state.selectArea1].children.map((it, index) => {
                      return (<option key={index} value={it.id}>{it.orgName}</option>);
                    })}
                  </select>
                </div>
                : null
              )
          }
        </div>

        <div className="info-line centerV">
          <div className="text centerV">上传头像<br />(200*200)</div>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="/posts/"
            beforeUpload={this.beforeUpload}
            customRequest={this.upload}
          >
          { this.state.avatarUrl ?
              <img src={this.state.avatarUrl} alt="" className="avatar" /> :
              <Icon type="plus" className="avatar-uploader-trigger" />
          }
        </Upload>
        </div>

        {/*报名按钮*/}
        <div className={btnClass} onClick={
          () => {
            if(this.state.isResultPage) {
              browserHistory.push('/');
            } else {
              this.doApply();
            }
          }
        }>{btnText}</div>

        {/*loading框*/}
        <Modal
          visible={this.state.showLoading}
          footer={null}
          maskClosable={false}
          closable={false}
          wrapClassName={'antd-loading-modal'}
          >
          <div className="centerH">
            <Spin />
          </div>
        </Modal>

        {/*剪裁界面*/}
        { this.state.showImgCropper ?
          <div className="cropper-layout">
            <Cropper
              ref='cropper'
              src={this.state.avatarTmpUrl}
              style={{height: '100%', width: '100%'}}
              // Cropper.js options
              dragMode='move'
              aspectRatio={1 / 1}
              guides={true}
              background={true} />
            <div className="cropper-cancel-btn center" onClick={
              () => {
                this.setState({
                  showImgCropper: false
                });
              }
            }>取消</div>
            <div className="cropper-ensure-btn center" onClick={
              () => {
                const canvas = this.refs.cropper.getCroppedCanvas();
                if (typeof canvas === 'undefined') {
                  this.uploadReject();
                  return;
                }
                this.setState({
                  showImgCropper: false,
                  avatarUrl: canvas.toDataURL()
                });

                console.log('canvas = ', canvas);
                console.log('canvas2. = ', HTMLCanvasElement.prototype);

                if (!HTMLCanvasElement.prototype.toBlob) {
                  var binStr = atob(canvas.toDataURL().split(',')[1] ),
                  len = binStr.length,
                  arr = new Uint8Array(len);

                  for (var i=0; i<len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                  }

                  this.avatarBlob = new Blob( [arr], {type: 'image/png'} );
                  this.uploadResolve();
                } else {
                  canvas.toBlob(blob => {
                    this.avatarBlob = blob;
                    this.uploadResolve();
                  });
                }

              }
            }>确定</div>
          </div>
          : null
        }

        {/*toast框*/}
        { this.state.toast.length > 0 ?
          <div className="toast">{this.state.toast}</div>
          : null
        }

      </div>
    );
  }
}

NewApplyComponent.defaultProps = {
};

export default NewApplyComponent;
