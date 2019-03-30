import {inject, observer} from 'mobx-react/native';
import React, {Component} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import EditInfo from '../Components/EditInfo';
import {scaleSize, setSpText2} from '../Lib/ScreenUtil';
import {setUserInfo} from '../Services/user';
import ApplicationStyles from '../Theme/ApplicationStyles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

@inject('UserStore')
@observer
export default class InfoEditScreen extends Component<InterfaceProps> {
  public static navigationOptions = {
    title: '填写资料',
  };

  constructor(prop) {
    super(prop);
  }

  public render() {
    const { baseInfo } = this.props.UserStore;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{...ApplicationStyles.mainContainer}}>
          <View style={styles.tipView}>
            <Text style={styles.tipText}>为了能提供更好的服务，请认真填写以下信息</Text>
          </View>
          <EditInfo UserStore={this.props.UserStore} />
        </View>
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
    const response = await setUserInfo({
      name: this.props.UserStore.baseInfo.name,
      phone: this.props.UserStore.baseInfo.phone,
      location: this.props.UserStore.baseInfo.location,
    });
    if (response.errno !== 0) {
      Alert.alert(
        response.errmsg,
      );
    } else {
      this.props.UserStore.setInfo(response.data);
      this.props.navigation.navigate( 'App');
    }
  }

}

const styles = StyleSheet.create({
  tipView: {
    paddingBottom: scaleSize(12),
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
