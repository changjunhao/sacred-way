import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export function sendMobileMessage(params: {phone: any; type: any}) {
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
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errno !== 0) {
        Alert.alert(responseJson.errmsg);
      }
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export function checkVerificationCode(params: {phone: any; code: any}) {
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
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export function login(params: {phone: string; password: string}) {
  return fetch(`${BASEURL}/membercenter/H5Register/LoginWithPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile_number: params.phone,
      password: params.password,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errno !== 0) {
        Alert.alert(responseJson.errmsg);
      }
      return responseJson.data;
    })
    .catch(() => {
      // console.error(error);
    });
}

export function signUp(params: {phone: any; code: any; password: any}) {
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
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errno !== 0) {
        Alert.alert(responseJson.errmsg);
      }
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export function resetPassword(params: {
  phone: any;
  code: any;
  password: any;
  repeatPassword: any;
}) {
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
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export async function getUserInfo() {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/Userinfo/getUserInfo`, {
    headers: {
      USERSIGN: userToken || '',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export async function setUserInfo(params: {
  duty?: any;
  company?: any;
  weChatQR?: any;
  weChat?: any;
  trade?: any;
  nickName?: any;
  avatar?: any;
  phone: any;
  name: any;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
    heading: number;
    speed: number;
  };
}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/Userinfo/setUserInfo`, {
    method: 'POST',
    headers: {
      USERSIGN: userToken || '',
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
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}

export function uploadAvatar(params: {
  data?: string;
  name?: string;
  uri?: string;
}) {
  const formData = new FormData();
  formData.append('file', {
    // uri: 'data:image/jpeg;base64,' + params.data,
    // type: 'multipart/form-data',
    uri: params.uri,
    name: params.name || params.uri?.slice(params.uri.lastIndexOf('/') + 1),
  });
  formData.append('dir', 'headImg');
  return fetch(`${BASEURL}/utility/FileUpload/uploadFtoOss`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(() => {
      // console.error(error);
    });
}
