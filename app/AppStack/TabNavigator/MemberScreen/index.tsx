import {inject} from 'mobx-react/native';
import React, {Component, Fragment} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView, Text,
  View,
} from 'react-native';
import {NavigationEvents, NavigationScreenProps} from 'react-navigation';
import styles from './Styles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

@inject('UserStore')
export default class MemberScreen extends Component<InterfaceProps, {}> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  public render() {
    const userInfo = this.props.UserStore.info;

    return (
      <Fragment>
        <NavigationEvents onWillFocus={this.fetchData} />
        <ScrollView>
          <ImageBackground
            style={styles.memberCardBg}
            source={require('../../../Images/tab_member_images/member_card_bg.png')}>
            <View style={styles.cardContainer}>
              <Image
                style={styles.avatar}
                source={userInfo.head_img ? {uri: userInfo.head_img} : require('../../../Images/mrtx.png')}
                resizeMode={'cover'}
              />
              <Text style={styles.userName}>
                {userInfo.real_name || userInfo.nick_name}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.mainContainer}>
            <View style={styles.assetsInfoCard}>

            </View>
            <View style={styles.recommendation}>

            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }

  private fetchData = async () => {

  }
}
