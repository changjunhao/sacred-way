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
      invite_code: params.inviteCode,
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
