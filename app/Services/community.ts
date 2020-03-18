import {toJS} from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const {BASEURL} = config;

export function getCommunityList(params: {type: any}) {
  return fetch(
    `${BASEURL}/membercenter/communityEssence/getCommunityList?type=${
      params.type
    }`,
    {
      headers: {
        USERSIGN: toJS(store).token,
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}

export function getCommunityInfo(params: {id: any}) {
  return fetch(
    `${BASEURL}/membercenter/communityEssence/getCommunityInfo?id=${params.id}`,
    {
      headers: {
        USERSIGN: toJS(store).token,
      },
    },
  )
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}
