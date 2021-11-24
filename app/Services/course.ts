import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export async function getCurriculumlist() {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/curriculum/curriculumlist`, {
    headers: {
      USERSIGN: userToken || '',
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

export async function getUserBuyed() {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/column/getUserBuyed`, {
    headers: {
      USERSIGN: userToken || '',
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

export async function getCourseList(params: {categoryId: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/curriculum/getCurriculumByCategoryId?category_id=${params.categoryId}`,
    {
      headers: {
        USERSIGN: userToken || '',
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

export async function getCourseDetail(params: {
  column_id?: string;
  id: string;
}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/curriculum/getCurriculumInfo?id=${params.id}`,
    {
      headers: {
        USERSIGN: userToken || '',
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

export async function getSubCurriculum(params: {id: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(
    `${BASEURL}/membercenter/curriculum/getSubCurriculum?curriculum_id=${params.id}`,
    {
      headers: {
        USERSIGN: userToken || '',
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
