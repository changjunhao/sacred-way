import {toJS} from 'mobx';
import store from '../Stores/TokenStore';
import config from './config';

const {BASEURL} = config;

export function getCurriculumlist() {
  return fetch(`${BASEURL}/membercenter/curriculum/curriculumlist`, {
    headers: {
      USERSIGN: toJS(store).token,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}

export function getUserBuyed() {
  return fetch(`${BASEURL}/membercenter/column/getUserBuyed`, {
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

export function getCourseList(params: {categoryId: any}) {
  return fetch(
    `${BASEURL}/membercenter/curriculum/getCurriculumByCategoryId?category_id=${params.categoryId}`,
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

export function getCourseDetail(params: {column_id?: string; id: string}) {
  return fetch(
    `${BASEURL}/membercenter/curriculum/getCurriculumInfo?id=${params.id}`,
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

export function getSubCurriculum(params: {id: any}) {
  return fetch(
    `${BASEURL}/membercenter/curriculum/getSubCurriculum?curriculum_id=${params.id}`,
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
