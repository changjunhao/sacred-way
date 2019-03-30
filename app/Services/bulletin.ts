import { toJS } from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const { BASEURL } = config;

export function getBulletinList(params = {page: 1, count: 5}) {
  return fetch(`${BASEURL}/membercenter/announcement/announcementList?page=${params.page}&count=${params.count}`, {
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

export function getBulletin(params) {
  return fetch(`${BASEURL}/membercenter/announcement/getAnnouncementInfo?id=${params.id}`, {
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
