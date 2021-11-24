import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './config';

const {BASEURL} = config;

export async function getSpecialColumnInfo(params: {id: any}) {
  const userToken = await AsyncStorage.getItem('userToken');
  return fetch(`${BASEURL}/membercenter/Column/getColumnInfo?id=${params.id}`, {
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
