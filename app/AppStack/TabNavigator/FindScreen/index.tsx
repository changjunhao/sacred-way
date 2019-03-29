import React, {Component, Fragment} from 'react';
import { ScrollView } from 'react-native';
import {NavigationEvents} from 'react-navigation';
import ApplicationStyles from '../../../Theme/ApplicationStyles';

export default class FindScreen extends Component<{}> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  public render() {
    return (
      <Fragment>
        <NavigationEvents onWillFocus={this.fetchData} />
        <ScrollView style={{...ApplicationStyles.mainContainer}}></ScrollView>
      </Fragment>
    );
  }

  private fetchData = async () => {

  }
}
