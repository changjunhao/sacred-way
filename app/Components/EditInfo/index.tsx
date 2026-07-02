import React, {useContext, useEffect, useState} from 'react';
import {
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Ionicons as Icon} from '@react-native-vector-icons/ionicons';
import UserContext from '../../context/userContext';
import {scaleSize} from '../../Lib/ScreenUtil';
import district from './district';
import styles from './Styles';

const EditInfo: React.FC = () => {
  const {userState, userDispatch} = useContext(UserContext);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);

  // Flatten district data for the pickers
  // Structure: [{ provinceName: [{ cityName: ['district1', ...] }] }]
  const provinces = district.map((d: any) => Object.keys(d)[0]);
  const provinceData: Record<string, any> = district[selectedProvince];
  const provinceKey = provinceData ? Object.keys(provinceData)[0] : '';
  const cityList: Record<string, any>[] = provinceData
    ? provinceData[provinceKey]
    : [];
  const cities = cityList.map((c) => Object.keys(c)[0]);
  const cityData = cityList[selectedCity];
  const cityKey = cityData ? Object.keys(cityData)[0] : '';
  const districtList: string[] = cityData ? cityData[cityKey] : [];

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
    setPickerVisible(true);
  };

  const handlePickerConfirm = () => {
    let location = provinces[selectedProvince] || '';
    if (cities[selectedCity]) {
      location += `-${cities[selectedCity]}`;
      if (districtList[selectedDistrict]) {
        location += `-${districtList[selectedDistrict]}`;
      }
    }
    userDispatch({
      type: 'SET_BASE_INFO',
      baseInfo: {
        location,
      },
    });
    setPickerVisible(false);
  };

  return (
    <>
      <View>
        <View style={styles.labelView}>
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'star'} />
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
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'star'} />
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
          <Icon size={scaleSize(8)} color="#FF3F3F" name={'star'} />
          <Text style={styles.labelText}>所在地</Text>
        </View>
        <TouchableHighlight underlayColor="white" onPress={handlePickerShow}>
          <Text style={styles.input}>{userState.baseInfo.location}</Text>
        </TouchableHighlight>
      </View>
      <Modal visible={pickerVisible} transparent animationType="slide">
        <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12}}>
              <TouchableHighlight underlayColor="white" onPress={() => setPickerVisible(false)}>
                <Text style={{color: '#666F83', fontSize: 16}}>取消</Text>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="white" onPress={handlePickerConfirm}>
                <Text style={{color: '#2F86F6', fontSize: 16}}>确定</Text>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Picker
                style={{flex: 1, height: 200}}
                selectedValue={selectedProvince}
                onValueChange={(val: number) => { setSelectedProvince(val); setSelectedCity(0); setSelectedDistrict(0); }}>
                {provinces.map((name: string, idx: number) => (
                  <Picker.Item key={idx} label={name} value={idx} />
                ))}
              </Picker>
              <Picker
                style={{flex: 1, height: 200}}
                selectedValue={selectedCity}
                onValueChange={(val: number) => { setSelectedCity(val); setSelectedDistrict(0); }}>
                {cities.map((name: string, idx: number) => (
                  <Picker.Item key={idx} label={name} value={idx} />
                ))}
              </Picker>
              <Picker
                style={{flex: 1, height: 200}}
                selectedValue={selectedDistrict}
                onValueChange={(val: number) => setSelectedDistrict(val)}>
                {districtList.map((name: string, idx: number) => (
                  <Picker.Item key={idx} label={name} value={idx} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EditInfo;
