import React, {Component} from 'react';
import {Text, View} from 'react-native'
import {NavigationScreenProps, SafeAreaView} from 'react-navigation'
import styles from './Styles';

interface InterfaceStates {
  phone: string;
  password: string;
}

interface InterfaceProps extends NavigationScreenProps<{}> {}

export default class ResetPasswordScreen extends Component<InterfaceProps, InterfaceStates> {
  public render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              美秒短视频会员中心
            </Text>
            <Text style={styles.headerSubtitle}>
              重置密码
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
