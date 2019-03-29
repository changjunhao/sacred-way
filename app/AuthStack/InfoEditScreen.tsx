import React, {Component} from 'react';
import {
  SafeAreaView,
  Text, TouchableHighlight,
  View,
} from 'react-native';
import EditInfo from '../Components/EditInfo';
import ApplicationStyles from '../Theme/ApplicationStyles';

export default class InfoEditScreen extends Component {
  public static navigationOptions = {
    title: '填写资料',
  };

  constructor(prop) {
    super(prop);
  }

  public render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{...ApplicationStyles.mainContainer}}>
          <EditInfo />
        </View>
        <TouchableHighlight underlayColor='white'>
          <View style={{backgroundColor: '#272A32', height: 45}}>
            <Text style={{color: '#FFF', fontSize: 16, lineHeight: 45, textAlign: 'center'}}>完成</Text>
          </View>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}
