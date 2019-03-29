import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class InfoModify extends Component {
  public static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(prop) {
    super(prop);
  }

  public render() {
    return (
      <View>
        <Text>信息编辑</Text>
      </View>
    );
  }
}
