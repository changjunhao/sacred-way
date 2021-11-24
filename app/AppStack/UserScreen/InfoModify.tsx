import React, {FC, useContext, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageLibraryOptions} from 'react-native-image-picker/src/types';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import UserContext from '../../context/userContext';
import EditInfo from '../../Components/EditInfo';
import InputStyles from '../../Components/EditInfo/Styles';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {setUserInfo, uploadAvatar} from '../../Services/user';
import ApplicationStyles from '../../Theme/ApplicationStyles';

type ScreenNavigationProp = StackNavigationProp<any>;
interface InterfaceProps {
  navigation: ScreenNavigationProp;
}

const InfoModify: FC<InterfaceProps> = props => {
  const {userState, userDispatch} = useContext(UserContext);
  const baseInfo = userState.baseInfo || {};
  const [avatar, setAvatar] = useState(userState.info.head_img);
  const [nickName, setNickName] = useState('');
  const [weChat, setWeChat] = useState('');
  const [weChatQR, setWeChatQR] = useState('');
  const [company, setCompany] = useState('');
  const [duty, setDuty] = useState('');
  const [trade, setTrade] = useState('');

  const handleSubmit = async () => {
    const {name, phone, location} = baseInfo;
    await setUserInfo({
      name,
      phone,
      location,
      avatar,
      nickName,
      weChat,
      weChatQR,
      company,
      duty,
      trade,
    }).then(res => {
      if (res.errno === 0) {
        userDispatch({type: 'SET_INFO', info: res.data});
        props.navigation.goBack();
      } else {
        Alert.alert(res.errmsg);
      }
    });
  };

  const handleSelectImage = (type: string) => {
    const options: ImageLibraryOptions = {
      // includeBase64: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        Alert.alert(response.errorMessage);
      } else {
        const assets = response.assets;
        uploadAvatar({
          // data: assets[0].base64,
          uri: assets?.[0]?.uri,
          name: assets?.[0]?.fileName,
        }).then(res => {
          if (res.errno === 0) {
            if (type === 'avatar') {
              setAvatar(res.data.info.file_url);
            } else {
              setWeChatQR(res.data.info.file_url);
            }
          } else {
            Alert.alert(res.errmsg);
          }
        });
      }
    });
  };

  // TODO keyboardVerticalOffset 需判断设备
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        // @ts-ignore
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={88}
        enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            ...ApplicationStyles.mainContainer,
          }}>
          <View style={styles.avatarActionView}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => handleSelectImage('avatar')}>
              <View>
                <Image
                  style={styles.avatar}
                  source={
                    avatar ? {uri: avatar} : require('../../Images/mrtx.png')
                  }
                  resizeMode={'cover'}
                />
                <Text style={styles.avatarTip}>点击修改头像</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={ApplicationStyles.hr} />
          <View style={styles.infoView}>
            <EditInfo />
          </View>
          <View style={ApplicationStyles.hr} />
          <View style={styles.infoView}>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>昵称</Text>
              </View>
              <TextInput
                style={InputStyles.input}
                placeholderTextColor={'#8E8E8E'}
                placeholder={'请输入昵称（6个字）'}
                defaultValue={userState.info.nick_name}
                onChangeText={val => setNickName(val)}
              />
            </View>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>微信号</Text>
              </View>
              <TextInput
                style={InputStyles.input}
                placeholderTextColor={'#8E8E8E'}
                placeholder={'请输入微信号（20个字）'}
                defaultValue={userState.info.wechat}
                onChangeText={val => setWeChat(val)}
              />
            </View>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>微信二维码</Text>
              </View>
              <TouchableHighlight
                underlayColor="white"
                onPress={() => handleSelectImage('qr')}>
                <View
                  style={{
                    ...styles.weChatQRView,
                  }}>
                  {weChatQR || userState.info.wechat_qrcode ? (
                    <Image
                      style={{
                        ...styles.weChatQR,
                      }}
                      resizeMode={'cover'}
                      source={{
                        uri: weChatQR || userState.info.wechat_qrcode,
                      }}
                    />
                  ) : (
                    <Icon
                      size={setSpText2(40)}
                      color={'#272A32'}
                      name={'plus'}
                    />
                  )}
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>公司名称</Text>
              </View>
              <TextInput
                style={InputStyles.input}
                placeholderTextColor={'#8E8E8E'}
                placeholder={'请输入公司名称（20个字）'}
                defaultValue={userState.info.company}
                onChangeText={val => setCompany(val)}
              />
            </View>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>职务名称</Text>
              </View>
              <TextInput
                style={InputStyles.input}
                placeholderTextColor={'#8E8E8E'}
                placeholder={'请输入职务名称（10个字）'}
                defaultValue={userState.info.duty}
                onChangeText={val => setDuty(val)}
              />
            </View>
            <View>
              <View style={InputStyles.labelView}>
                <Text style={InputStyles.labelText}>所属行业</Text>
              </View>
              <TextInput
                style={InputStyles.input}
                placeholderTextColor={'#8E8E8E'}
                placeholder={'请输入所属行业（10个字）'}
                defaultValue={userState.info.trade}
                onChangeText={val => setTrade(val)}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  avatarActionView: {
    height: scaleSize(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: scaleSize(90),
    height: scaleSize(90),
    borderRadius: scaleSize(45),
    marginBottom: scaleSize(16),
  },
  avatarTip: {
    color: '#272A32',
    fontSize: setSpText2(12),
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: setSpText2(16),
    lineHeight: scaleSize(45),
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
  infoView: {
    paddingVertical: scaleSize(16),
  },
  weChatQRView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scaleSize(12),
    borderColor: '#E2E2E2',
    borderWidth: 1,
    width: scaleSize(90),
    height: scaleSize(90),
  },
  weChatQR: {
    width: scaleSize(90),
    height: scaleSize(90),
  },
});

export default InfoModify;
