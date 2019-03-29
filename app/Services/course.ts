import AsyncStorage from '@react-native-community/async-storage';
import config from './config';

const { BASEURL } = config;

export async function getCurriculumlist() {
  return fetch(`${BASEURL}/membercenter/curriculum/curriculumlist`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getUserBuyCurriculum() {
  return fetch(`${BASEURL}/membercenter/curriculum/getUserBuyCurriculum`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
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

export async function getCourseList(params) {
  return fetch(`${BASEURL}/membercenter/curriculum/getCurriculumByCategoryId?category_id=${params.categoryId}`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
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

export async function getCourseDetail(params) {
  return fetch(`${BASEURL}/membercenter/curriculum/getCurriculumInfo?id=${params.id}`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
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

export async function getSubCurriculum(params) {
  return fetch(`${BASEURL}/membercenter/curriculum/getSubCurriculum?curriculum_id=${params.id}`, {
    headers: {
      USERSIGN: await AsyncStorage.getItem('userToken') || '',
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
