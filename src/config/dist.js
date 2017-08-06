'use strict';

import baseConfig from './base';

const cswhPre = 'http://cswhmobile.kkapp.top';

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here

  //api
  getApplyInfo: cswhPre + '/act/getSignupPageInfo',
  uploadAvatar: cswhPre + '/act/uploadPlayerProfileImage',
  apply: cswhPre + '/act/saveSignup'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
