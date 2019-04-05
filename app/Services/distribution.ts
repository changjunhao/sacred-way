import { toJS } from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const { BASEURL } = config;

export function getPersonMoney() {
  return fetch(`${BASEURL}/membercenter/Distribution/person_money`, {
    headers: {
      USERSIGN: toJS(store).token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getDirectRecommend() {
  return fetch(`${BASEURL}/membercenter/Distribution/direct_recommend`, {
    headers: {
      USERSIGN: toJS(store).token,
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data;
    })
    .catch((error) => {
      console.error(error);
    });
}
