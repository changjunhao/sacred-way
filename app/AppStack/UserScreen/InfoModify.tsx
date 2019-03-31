import {inject, observer} from 'mobx-react/native';
import React, {Component} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet, Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {NavigationScreenProps} from 'react-navigation';
import EditInfo from '../../Components/EditInfo';
import InputStyles from '../../Components/EditInfo/Styles';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import ApplicationStyles from '../../Theme/ApplicationStyles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

interface InterfaceStates {
  avatar: string;
  nickName: string;
}

@inject('UserStore')
@observer
export default class InfoModify extends Component<InterfaceProps, InterfaceStates> {
  public static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(prop) {
    super(prop);
    this.state = {
      avatar: '',
      nickName: '',
    };
  }

  public componentDidMount(): void {
    this.setState({
      avatar: this.props.UserStore.info.head_img,
    });
  }

  public render() {
    const { baseInfo } = this.props.UserStore;

    // TODO keyboardVerticalOffset 需判断设备
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={88} enabled>
          <ScrollView style={{...ApplicationStyles.mainContainer}}>
            <View style={styles.avatarActionView}>
              <TouchableHighlight underlayColor='white'  onPress={this.handleSelectImage}>
                <View>
                  <Image
                    style={styles.avatar}
                    source={this.state.avatar ? {uri: this.state.avatar} : require('../../Images/mrtx.png')}
                    resizeMode={'cover'}
                  />
                  <Text style={styles.avatarTip}>点击修改头像</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.hr} />
            <View style={styles.infoView}>
              <EditInfo UserStore={this.props.UserStore} />
            </View>
            <View style={styles.hr} />
            <View style={styles.infoView}>
              <View>
                <View style={InputStyles.labelView}>
                  <Text style={InputStyles.labelText}>昵称</Text>
                </View>
                <TextInput
                  style={InputStyles.input}
                  placeholder={'请输入昵称（6个字）'}
                  defaultValue={this.props.UserStore.info.nick_name}
                  onChangeText={(nickName) => this.setState({nickName})}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableHighlight
          disabled={baseInfo.phone === '' || baseInfo.name === '' || baseInfo.location === ''}
          underlayColor='white'
          onPress={this.handleSubmit}
        >
          <View style={
            baseInfo.phone !== '' && baseInfo.name !== '' && baseInfo.location !== '' ?
              {...styles.button, ...styles.buttonActive} :
              {...styles.button, ...styles.buttonDisable}
          }>
            <Text style={styles.buttonText}>完成</Text>
          </View>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }

  private handleSubmit = async () => {
    // TODO 提交
  }

  private handleSelectImage = () => {
    const options = {
      title: '选取头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: null,
      cameraType: 'front',
      mediaType: 'photo',
    };

    // @ts-ignore
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        Alert.alert(response.error);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatar: response.uri,
        });
      }
    });
  }
}

const styles = StyleSheet.create({
  avatarActionView: {
    marginTop: scaleSize(-15),
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
  hr: {
    width: scaleSize(375),
    height: scaleSize(10),
    backgroundColor: '#E2E2E2',
    marginLeft: scaleSize(-16),
  },
  infoView: {
    paddingVertical: scaleSize(16),
  },
});
