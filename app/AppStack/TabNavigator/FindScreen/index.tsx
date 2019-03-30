import {inject} from 'mobx-react/native';
import React, {Component, Fragment} from 'react';
import { Image, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import {NavigationEvents, NavigationScreenProps} from 'react-navigation';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';
import ApplicationStyles from '../../../Theme/ApplicationStyles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

@inject('UserStore')
export default class FindScreen extends Component<InterfaceProps> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  public render() {
    const userInfo = this.props.UserStore.info;

    return (
      <Fragment>
        <NavigationEvents onWillFocus={this.fetchData} />
        <ScrollView style={{...ApplicationStyles.mainContainer, paddingHorizontal: scaleSize(12)}}>
          {userInfo.status !== 2 ?
            (
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ChangeInfo')}>
                <View
                  style={{
                    backgroundColor: '#FFF4DA',
                    borderRadius: 4,
                    height: scaleSize(35),
                    paddingHorizontal: scaleSize(10),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'}}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{marginRight: scaleSize(7)}} source={require('../../../Images/tishi.png')}/>
                    <Text style={{color: '#EF3B3B', fontSize: setSpText2(12)}}>完善资料，获得更多的合作机会</Text>
                  </View>
                  <View style={{borderColor: '#EF3B3B', borderWidth: 1}}>
                    <Text
                      style={{
                        color: '#EF3B3B',
                        fontSize: setSpText2(11),
                        paddingHorizontal: scaleSize(14),
                        paddingVertical: scaleSize(5)}}>
                      立刻完善
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
            : null}
        </ScrollView>
      </Fragment>
    );
  }

  private fetchData = async () => {

  }
}
