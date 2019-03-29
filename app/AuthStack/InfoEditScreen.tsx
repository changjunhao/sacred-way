import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';

export default class InfoEditScreen extends Component {
  constructor(prop) {
    super(prop);
  }

  public render() {
    return (
      <SafeAreaView>
        <View>
          <Text>信息编辑必填</Text>
        </View>
      </SafeAreaView>
    );
  }
}
