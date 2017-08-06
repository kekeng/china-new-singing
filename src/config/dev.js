'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here

  //api
  getApplyInfo: '/act/getSignupPageInfo',
  uploadAvatar: '/act/uploadPlayerProfileImage',
  apply: '/act/saveSignup'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
