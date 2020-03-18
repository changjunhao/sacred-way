import AsyncStorage from '@react-native-community/async-storage';
import {inject, observer} from 'mobx-react';
import React, {Component, Fragment} from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import CourseListComponent from '../../../Components/CourseList';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';
// import { getUserInfo } from '../../../Services/user';
import {getUserBuyed} from '../../../Services/course';
import ApplicationStyles from '../../../Theme/ApplicationStyles';

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceMyState {
  userInfo: any;
  purchasedCourses: any[];
}

interface InterfaceProps {
  UserStore: any;
  navigation: ScreenNavigationProp;
}

@inject('UserStore')
@observer
export default class MyScreen extends Component<
  InterfaceProps,
  InterfaceMyState
> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      userInfo: {},
      purchasedCourses: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }

  public render() {
    const {userInfo, purchasedCourses} = this.state;

    return (
      <Fragment>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...ApplicationStyles.mainContainer}}>
          <ImageBackground
            source={require('../../../Images/tab_member_images/bg.png')}
            style={styles.cardBackgroundImage}
            imageStyle={{resizeMode: 'cover', borderRadius: 4}}>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableWithoutFeedback onPress={this.showActionSheet}>
                <Image
                  source={require('../../../Images/tab_member_images/shezhi.png')}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: scaleSize(9),
                marginBottom: scaleSize(16),
              }}>
              <Image
                style={styles.avatar}
                source={
                  userInfo.head_img
                    ? {uri: userInfo.head_img}
                    : require('../../../Images/mrtx.png')
                }
                resizeMode={'cover'}
              />
              <View
                style={{
                  marginLeft: scaleSize(16),
                  height: scaleSize(50),
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#FEE3A6',
                      fontSize: setSpText2(16),
                      marginRight: scaleSize(8),
                    }}>
                    {userInfo.real_name || userInfo.nick_name}
                  </Text>
                  {userInfo.member_name && (
                    <Text
                      style={{
                        fontSize: setSpText2(12),
                        color: '#E4CA91',
                        backgroundColor: '#5A5952',
                        paddingHorizontal: scaleSize(12),
                        paddingVertical: scaleSize(5),
                      }}>
                      {userInfo.member_name}
                    </Text>
                  )}
                </View>
                <Text style={{color: '#FEE3A6', fontSize: setSpText2(11)}}>
                  {userInfo.mobile_number}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={{paddingVertical: scaleSize(25)}}>
            <Text style={{...ApplicationStyles.contentListTitle}}>
              我学习的课程
            </Text>
            {purchasedCourses.map((course, index) => (
              <CourseListComponent
                key={course.curriculum_id}
                course={course}
                recommend={false}
                purchased={true}
                navigation={this.props.navigation}
                borderBottom={index !== purchasedCourses.length - 1}
              />
            ))}
          </View>
        </ScrollView>
      </Fragment>
    );
  }

  private fetchData = () => {
    this.setState({
      userInfo: this.props.UserStore.info,
    });
    // getUserInfo()
    //   .then((userInfo) => {
    //     this.setState({
    //       userInfo,
    //     });
    //   });
    getUserBuyed().then(res => {
      this.setState({
        purchasedCourses: res.curriculum_list,
      });
    });
  };

  private showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['修改资料', '修改密码', '退出', '取消'],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 3,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            this.props.navigation.navigate('InfoModify');
          }
          if (buttonIndex === 1) {
            this.props.navigation.navigate('PasswordModify');
          }
          if (buttonIndex === 2) {
            Alert.alert(
              '提示',
              '确认退出该账号吗',
              [
                {text: '取消', style: 'cancel'},
                {
                  text: '确认退出',
                  onPress: () => this.signOutAsync(),
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    } else {
      // TODO
    }
  };

  private signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  cardBackgroundImage: {
    minHeight: scaleSize(140),
    shadowColor: 'rgb(37, 41, 37)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    marginTop: scaleSize(15),
    padding: scaleSize(16),
  },
  avatar: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    borderColor: 'rgb(254, 227, 166)',
    borderWidth: 2,
  },
  rolesView: {
    paddingRight: scaleSize(17),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  roleView: {
    backgroundColor: '#5A5952',
    marginRight: scaleSize(8),
    borderRadius: 2,
    marginBottom: scaleSize(8),
  },
  roleText: {
    color: '#E4CA91',
    fontSize: setSpText2(12),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(6),
  },
  mainButtonView: {
    // width: 343,
    marginTop: scaleSize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: -scaleSize(9),
  },
  mainButton: {
    // width: 167,
    height: scaleSize(35),
    borderRadius: 4,
    flex: 1,
    marginLeft: scaleSize(9),
    backgroundColor: '#363636',
    shadowColor: '#252529',
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonImage: {
    marginRight: scaleSize(12),
  },
  mainButtonText: {
    color: '#fff',
    fontSize: setSpText2(12),
  },
  hr: {
    width: scaleSize(375),
    height: scaleSize(4),
    backgroundColor: '#E2E2E2',
    marginLeft: scaleSize(-16),
  },
  contentListHeader: {
    height: scaleSize(62),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentListTitle: {
    fontSize: setSpText2(18),
    color: '#272a32',
    fontWeight: 'bold',
  },
  questionItem: {
    marginBottom: scaleSize(14),
    flexDirection: 'row',
  },
  questionsListHeadImg: {
    width: scaleSize(60),
    height: scaleSize(40),
    borderRadius: scaleSize(4),
    marginRight: scaleSize(16),
  },
  purchaseInfo: {
    bottom: scaleSize(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});
