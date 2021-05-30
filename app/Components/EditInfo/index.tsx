import React, {useEffect} from 'react';
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
import {scaleSize} from '../../Lib/ScreenUtil';
import district from './district';
import styles from './Styles';

interface InterfaceProps {
  UserStore: any;
}

const EditInfo: React.FC<InterfaceProps> = props => {
  const {UserStore} = props;

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
    UserStore.setBaseInfo({
      name: UserStore.info.real_name,
      phone: UserStore.info.contact_number || UserStore.info.mobile_number,
      location: UserStore.info.location,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePhoneChange = (phone: any) => {
    UserStore.setBaseInfo({phone});
  };

  const handleNameChange = (name: any) => {
    UserStore.setBaseInfo({name});
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
        UserStore.setBaseInfo({location});
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
          defaultValue={UserStore.baseInfo.name}
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
          defaultValue={UserStore.baseInfo.phone}
          onChangeText={value => handlePhoneChange(value)}
        />
      </View>
      <View>
        <View style={styles.labelView}>
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'ios-star'} />
          <Text style={styles.labelText}>所在地</Text>
        </View>
        <TouchableHighlight underlayColor="white" onPress={handlePickerShow}>
          <Text style={styles.input}>{UserStore.baseInfo.location}</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default EditInfo;
