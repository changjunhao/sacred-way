import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
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
import ImagePicker from 'react-native-image-picker';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import EditInfo from '../../Components/EditInfo';
import InputStyles from '../../Components/EditInfo/Styles';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {setUserInfo, uploadAvatar} from '../../Services/user';
import ApplicationStyles from '../../Theme/ApplicationStyles';

type ScreenNavigationProp = StackNavigationProp<any>;
interface InterfaceProps {
  UserStore: any;
  navigation: ScreenNavigationProp;
}

interface InterfaceStates {
  avatar: string;
  nickName: string;
  weChat: string;
  weChatQR: string;
  company: string;
  duty: string;
  trade: string;
}

@inject('UserStore')
@observer
export default class InfoModify extends Component<
  InterfaceProps,
  InterfaceStates
> {
  constructor(prop: Readonly<InterfaceProps>) {
    super(prop);
    this.state = {
      avatar: this.props.UserStore.info.head_img,
      nickName: '',
      weChat: '',
      weChatQR: '',
      company: '',
      duty: '',
      trade: '',
    };
  }

  public render() {
    const {baseInfo} = this.props.UserStore;

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
                onPress={() => this.handleSelectImage('avatar')}>
                <View>
                  <Image
                    style={styles.avatar}
                    source={
                      this.state.avatar
                        ? {uri: this.state.avatar}
                        : require('../../Images/mrtx.png')
                    }
                    resizeMode={'cover'}
                  />
                  <Text style={styles.avatarTip}>点击修改头像</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={ApplicationStyles.hr} />
            <View style={styles.infoView}>
              <EditInfo UserStore={this.props.UserStore} />
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
                  defaultValue={this.props.UserStore.info.nick_name}
                  onChangeText={(nickName) => this.setState({nickName})}
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
                  defaultValue={this.props.UserStore.info.wechat}
                  onChangeText={(weChat) => this.setState({weChat})}
                />
              </View>
              <View>
                <View style={InputStyles.labelView}>
                  <Text style={InputStyles.labelText}>微信二维码</Text>
                </View>
                <TouchableHighlight
                  underlayColor="white"
                  // @ts-ignore
                  onPress={this.handleSelectImage}>
                  <View
                    style={{
                      ...styles.weChatQRView,
                    }}>
                    {this.state.weChatQR ||
                    this.props.UserStore.info.wechat_qrcode ? (
                      <Image
                        style={{
                          ...styles.weChatQR,
                        }}
                        resizeMode={'cover'}
                        source={{
                          uri:
                            this.state.weChatQR ||
                            this.props.UserStore.info.wechat_qrcode,
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
                  defaultValue={this.props.UserStore.info.company}
                  onChangeText={(company) => this.setState({company})}
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
                  defaultValue={this.props.UserStore.info.duty}
                  onChangeText={(duty) => this.setState({duty})}
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
                  defaultValue={this.props.UserStore.info.trade}
                  onChangeText={(trade) => this.setState({trade})}
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
          onPress={this.handleSubmit}>
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
  }

  private handleSubmit = async () => {
    const {name, phone, location} = this.props.UserStore.baseInfo;
    const {
      avatar,
      nickName,
      weChat,
      weChatQR,
      company,
      duty,
      trade,
    } = this.state;
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
    }).then((res) => {
      if (res.errno === 0) {
        this.props.UserStore.setInfo(res.data);
        this.props.navigation.goBack();
      } else {
        Alert.alert(res.errmsg);
      }
    });
  };

  private handleSelectImage = (type: string) => {
    const options = {
      title: '选取图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: null,
      mediaType: 'photo',
    };

    // @ts-ignore
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert(response.error);
      } else {
        uploadAvatar({uri: response.uri, name: response.fileName}).then(
          (res) => {
            if (res.errno === 0) {
              if (type === 'avatar') {
                this.setState({
                  avatar: res.data.info.file_url,
                });
              } else {
                this.setState({
                  weChatQR: res.data.info.file_url,
                });
              }
            } else {
              Alert.alert(res.errmsg);
            }
          },
        );
      }
    });
  };
}

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
