import {toJS} from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const {BASEURL} = config;

export function getSpecialColumnInfo(params: {id: any}) {
  return fetch(`${BASEURL}/membercenter/Column/getColumnInfo?id=${params.id}`, {
    headers: {
      USERSIGN: toJS(store).token,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson.data;
    })
    .catch(error => {
      console.error(error);
    });
}
