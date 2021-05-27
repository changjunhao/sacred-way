import {inject, observer} from 'mobx-react';
import React, {Component, Fragment} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import CourseListComponent from '../../../Components/CourseList';
import {setSpText2} from '../../../Lib/ScreenUtil';
import {
  getDirectRecommend,
  getPersonMoney,
} from '../../../Services/distribution';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import styles from './Styles';

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  UserStore: any;
  navigation: ScreenNavigationProp;
}

interface InterfaceStates {
  todayIncome: number;
  totalIncome: number;
  money: number;
  fans: number;
  scan: number;
  recommendList: any[];
}

@inject('UserStore')
@observer
export default class MemberScreen extends Component<
  InterfaceProps,
  InterfaceStates
> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      todayIncome: 0,
      totalIncome: 0,
      money: 0,
      fans: 0,
      scan: 0,
      recommendList: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.fetchData().then();
    });
  }

  public render() {
    const userInfo = this.props.UserStore.info;
    const {todayIncome, totalIncome, money, fans, scan, recommendList} =
      this.state;

    return (
      <Fragment>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.memberCardBg}
            source={require('../../../Images/tab_member_images/member_card_bg.png')}>
            <View style={styles.cardContainer}>
              <Image
                style={styles.avatar}
                source={
                  userInfo.head_img
                    ? {uri: userInfo.head_img}
                    : require('../../../Images/mrtx.png')
                }
                resizeMode={'cover'}
              />
              <Text style={styles.userName}>
                {userInfo.real_name || userInfo.nick_name}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.mainContainer}>
            <View style={styles.assetsInfoCard}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate('Earnings')}>
                <View style={styles.incomeView}>
                  <View style={styles.myIncome}>
                    <View
                      style={{
                        ...ApplicationStyles.flexRow,
                      }}>
                      <Text style={styles.infoTitle}>我的收益</Text>
                      <Icon
                        style={styles.infoTitleIcon}
                        size={setSpText2(15)}
                        color="rgba(0, 0, 0, 0.25)"
                        name={'right'}
                      />
                    </View>
                    <View style={styles.incomeInfo}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            ...styles.text,
                            ...styles.todayIncome,
                          }}>
                          {todayIncome / 100}
                        </Text>
                        <Text style={styles.infoTipText}>今日（元）</Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            ...styles.text,
                            ...styles.totalIncome,
                          }}>
                          {totalIncome / 100}
                        </Text>
                        <Text style={styles.infoTipText}>累计（元）</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.canWithdraw}>
                    <Text style={styles.money}>{money / 100}</Text>
                    <Text style={styles.infoTipText}>可提现金额（元）</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.myUsers}>
                <Text style={styles.infoTitle}>我的用户</Text>
                <View style={styles.myUsersInfo}>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Inviter')}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          ...styles.text,
                          ...styles.userNumber,
                        }}>
                        {fans}
                      </Text>
                      <Text style={styles.infoTipText}>购课粉丝</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Visited')}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          ...styles.text,
                          ...styles.userNumber,
                        }}>
                        {scan}
                      </Text>
                      <Text style={styles.infoTipText}>浏览用户</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            {recommendList.length === 0 ? null : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <LinearGradient
                    style={styles.recommendTitleBorder}
                    colors={['#F5E3C1', '#E8C38D']}
                  />
                  <Text style={styles.recommendTitle}>推荐好课</Text>
                </View>
                {recommendList.map((course, index) => (
                  <CourseListComponent
                    key={course.id}
                    course={course}
                    recommend={true}
                    purchased={false}
                    navigation={this.props.navigation}
                    borderBottom={index !== recommendList.length - 1}
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </Fragment>
    );
  }

  private fetchData = async () => {
    getPersonMoney().then(res => {
      this.setState({
        todayIncome: res.today,
        totalIncome: res.dis_money,
        money: res.money,
        fans: res.curriculum,
        scan: res.scan,
      });
    });
    getDirectRecommend().then(res => {
      this.setState({
        recommendList: res,
      });
    });
  };
}
