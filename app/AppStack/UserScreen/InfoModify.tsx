import {inject, observer} from 'mobx-react/native';
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import EditInfo from '../../Components/EditInfo';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import ApplicationStyles from '../../Theme/ApplicationStyles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

@inject('UserStore')
@observer
export default class InfoModify extends Component<InterfaceProps> {
  public static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(prop) {
    super(prop);
  }

  public render() {
    const { baseInfo } = this.props.UserStore;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{...ApplicationStyles.mainContainer}}>
          <EditInfo UserStore={this.props.UserStore} />
        </ScrollView>
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
