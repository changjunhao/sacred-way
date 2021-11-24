import React, {FC, useContext} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import UserContext from '../context/userContext';
import EditInfo from '../Components/EditInfo';
import {scaleSize, setSpText2} from '../Lib/ScreenUtil';
import {setUserInfo} from '../Services/user';
import ApplicationStyles from '../Theme/ApplicationStyles';

const InfoEditScreen: FC = () => {
  const {userState, userDispatch} = useContext(UserContext);
  const baseInfo = userState.baseInfo || {};

  const handleSubmit = async () => {
    const response = await setUserInfo({
      name: baseInfo.name,
      phone: baseInfo.phone,
      location: baseInfo.location,
    });
    if (response.errno !== 0) {
      Alert.alert(response.errmsg);
    } else {
      userDispatch({type: 'SET_INFO', info: response.data});
      userDispatch({
        type: 'SET_INFO_EDIT',
        infoEdit: false,
      });
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          ...ApplicationStyles.mainContainer,
        }}>
        <View style={styles.tipView}>
          <Text style={styles.tipText}>
            为了能提供更好的服务，请认真填写以下信息
          </Text>
        </View>
        <EditInfo />
      </View>
      <TouchableHighlight
        disabled={
          baseInfo.phone === '' ||
          baseInfo.name === '' ||
          baseInfo.location === ''
        }
        underlayColor="white"
        onPress={handleSubmit}>
        <View
          style={
            baseInfo.phone !== '' &&
            baseInfo.name !== '' &&
            baseInfo.location !== ''
              ? {...styles.button, ...styles.buttonActive}
              : {...styles.button, ...styles.buttonDisable}
          }>
          <Text style={styles.buttonText}>完成</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tipView: {
    paddingBottom: scaleSize(12),
    marginTop: scaleSize(15),
    marginBottom: scaleSize(18),
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  tipText: {
    color: '#272A32',
    fontSize: setSpText2(15),
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 45,
    textAlign: 'center',
  },
  button: {
    height: scaleSize(45),
  },
  buttonActive: {
    backgroundColor: '#272A32',
  },
  buttonDisable: {
    backgroundColor: '#bfc4d0',
  },
});

export default InfoEditScreen;
