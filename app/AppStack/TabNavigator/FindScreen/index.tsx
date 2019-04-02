import {inject} from 'mobx-react/native';
import React, {Component, Fragment} from 'react';
import { Image, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import {NavigationEvents, NavigationScreenProps} from 'react-navigation';
import CommunityListComponent from '../../../Components/CommunityList';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';
import {getBulletinList} from '../../../Services/bulletin';
import {getCommunityList} from '../../../Services/community';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

interface InterfaceStates {
  bulletinList: any[];
  questionsList: any[];
}

@inject('UserStore')
export default class FindScreen extends Component<InterfaceProps, InterfaceStates> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      bulletinList: [],
      questionsList: [],
    };
  }

  public componentDidMount() {
  }

  public render() {
    const userInfo = this.props.UserStore.info;
    const { bulletinList, questionsList } = this.state;

    const CommunityList = questionsList
      .map((question) => (
        <CommunityListComponent key={question.id} question={question} navigation={this.props.navigation}/>),
      );

    return (
      <Fragment>
        <NavigationEvents onWillFocus={this.fetchData} />
        <ScrollView style={{...ApplicationStyles.mainContainer, paddingHorizontal: scaleSize(12)}}>
          <View>
            {userInfo.status !== 2 ?
              (
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InfoModify')}>
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
            {bulletinList.map((bulletin) => (
              <TouchableWithoutFeedback
                key={bulletin.id}
                onPress={() => {
                  this.props.navigation.navigate('BulletinDetail', {id: bulletin.id, title: bulletin.title});
                }}
              >
                <View style={styles.bulletinView}>
                  <Text style={styles.bulletinTitle}>
                    {bulletin.category_name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{width: scaleSize(280), flexWrap: 'wrap', color: '#272A32', fontSize: setSpText2(12)}}>
                    {bulletin.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={{...ApplicationStyles.hr, marginLeft: scaleSize(-12)}} />
          <View>
            <View style={ApplicationStyles.contentListHeader}>
              <Text style={ApplicationStyles.contentListTitle}>美秒社群精华问答</Text>
              {questionsList.length > 4 ? (
                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('CommunityList')}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: setSpText2(13), color: '#272A32'}}>查看全部</Text>
                    <Icon size={setSpText2(15)} color='#272A32' name={'right'}/>
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
            {CommunityList}
          </View>
          <View style={{...ApplicationStyles.hr, marginLeft: scaleSize(-12)}} />
        </ScrollView>
      </Fragment>
    );
  }

  private fetchData = async () => {
    getBulletinList()
      .then((res) => {
        this.setState({
          bulletinList: res.list.filter((bulletin) => bulletin.is_top === 1),
        });
      });
    getCommunityList({type: 2})
      .then((res) => {
        this.setState({
          questionsList: res.list,
        });
      });
  }
}
