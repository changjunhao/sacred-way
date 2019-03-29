import React, {Component} from 'react';
import { ScrollView } from 'react-native';
import ApplicationStyles from '../../Theme/ApplicationStyles';

export default class FindScreen extends Component<{}> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  public render() {
    return (
      <ScrollView style={{...ApplicationStyles.mainContainer}}></ScrollView>
    );
  }
}
