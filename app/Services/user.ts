import { toJS } from 'mobx';
import {Alert} from 'react-native';
import store from '../Stores/TokenStore';
import config from './config';

const { BASEURL } = config;

export function sendMobileMessage(params) {
  return fetch(`${BASEURL}/utility/MobileMessage/sendMobileMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      sender: '美秒短视频会员中心',
      check_mobile_exist: params.type,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errno !== 0) {
        Alert.alert(
          responseJson.errmsg,
        );
      }
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function checkVerificationCode(params) {
  return fetch(`${BASEURL}/utility/MobileMessage/checkCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      code: params.code,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function login(params: { phone: string; password: string; }) {
  return fetch(`${BASEURL}/membercenter/Register/LoginWithPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      password: params.password,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errno !== 0) {
        Alert.alert(
          responseJson.errmsg,
        );
      }
      return responseJson.data;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function signUp(params) {
  return fetch(`${BASEURL}/membercenter/H5Register/registerWithPassWord`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      code: params.code,
      password: params.password,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errno !== 0) {
        Alert.alert(
          responseJson.errmsg,
        );
      }
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function resetPassword(params) {
  return fetch(`${BASEURL}/membercenter/Password/setPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      code: params.code,
      password: params.password,
      password_repeat: params.repeatPassword,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function getUserInfo() {
  return fetch(`${BASEURL}/membercenter/Userinfo/getUserInfo`, {
    headers: {
      USERSIGN: toJS(store).token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function setUserInfo(params) {
  return fetch(`${BASEURL}/membercenter/Userinfo/setUserInfo`, {
    method: 'POST',
    headers: {
      USERSIGN: toJS(store).token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      real_name: params.name,
      contact_number: params.phone,
      location: params.location,
      head_img: params.avatar,
      nick_name: params.nickName,
      wechat: params.weChat,
      wechat_qrcode: params.weChatQR,
      company: params.company,
      duty: params.duty,
      trade: params.trade,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}

export function uploadAvatar(params) {
  const formData = new FormData();
  // @ts-ignore
  formData.append('file', {uri: params.uri, type: 'application/octet-stream', name: params.name});
  formData.append('dir', 'headImg');
  return fetch(`${BASEURL}/utility/FileUpload/uploadFtoOss`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      // console.error(error);
    });
}
