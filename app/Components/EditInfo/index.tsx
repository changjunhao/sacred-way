import React, {useContext, useEffect} from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Picker from 'react-native-picker';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../../context/userContext';
import {scaleSize} from '../../Lib/ScreenUtil';
import district from './district';
import styles from './Styles';

const EditInfo: React.FC = () => {
  const {userState, userDispatch} = useContext(UserContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Picker.isPickerShow(status => {
          if (status) {
            Picker.hide();
          }
        });
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      Picker.hide();
    };
  }, []);

  useEffect(() => {
    userDispatch({
      type: 'SET_BASE_INFO',
      baseInfo: {
        name: userState.info.real_name,
        phone: userState.info.contact_number || userState.info.mobile_number,
        location: userState.info.location,
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePhoneChange = (phone: any) => {
    userDispatch({
      type: 'SET_BASE_INFO',
      baseInfo: {
        phone,
      },
    });
  };

  const handleNameChange = (name: any) => {
    userDispatch({
      type: 'SET_BASE_INFO',
      baseInfo: {
        name,
      },
    });
  };

  const handlePickerShow = () => {
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择省市区/县',
      pickerConfirmBtnColor: [47, 134, 246, 1],
      pickerCancelBtnColor: [102, 111, 131, 1],
      pickerTitleColor: [17, 26, 52, 1],
      pickerToolBarBg: [249, 250, 251, 1],
      pickerBg: [255, 255, 255, 1],
      pickerRowHeight: 45,
      pickerData: district,
      selectedValue: [59],
      onPickerConfirm: data => {
        let location = data[0];
        if (data[1]) {
          location += `-${data[1]}`;
          if (data[2]) {
            location += `-${data[2]}`;
          }
        }
        userDispatch({
          type: 'SET_BASE_INFO',
          baseInfo: {
            location,
          },
        });
      },
    });
    Picker.show();
  };

  return (
    <>
      <View>
        <View style={styles.labelView}>
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'ios-star'} />
          <Text style={styles.labelText}>姓名</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请输入姓名（6个字）'}
          defaultValue={userState.baseInfo.name}
          onChangeText={value => handleNameChange(value)}
        />
      </View>
      <View>
        <View style={styles.labelView}>
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'ios-star'} />
          <Text style={styles.labelText}>联系电话</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#8E8E8E'}
          placeholder={'请输入联系电话'}
          defaultValue={userState.baseInfo.phone}
          onChangeText={value => handlePhoneChange(value)}
        />
      </View>
      <View>
        <View style={styles.labelView}>
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'ios-star'} />
          <Text style={styles.labelText}>所在地</Text>
        </View>
        <TouchableHighlight underlayColor="white" onPress={handlePickerShow}>
          <Text style={styles.input}>{userState.baseInfo.location}</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default EditInfo;
