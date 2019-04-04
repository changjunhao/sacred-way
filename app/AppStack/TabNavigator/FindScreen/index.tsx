import {inject} from 'mobx-react/native';
import React, {Component, Fragment} from 'react';
import { Image, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationEvents, NavigationScreenProps} from 'react-navigation';
import CommunityListComponent from '../../../Components/CommunityList';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';
import {getBulletinList} from '../../../Services/bulletin';
import {getCommunityList} from '../../../Services/community';
import { getCurriculumlist } from '../../../Services/course';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  UserStore;
}

interface InterfaceStates {
  bulletinList: any[];
  questionsList: any[];
  specialColumnList: any[];
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
      specialColumnList: [],
    };
  }

  public render() {
    const userInfo = this.props.UserStore.info;
    const { bulletinList, questionsList, specialColumnList } = this.state;

    const CommunityList = questionsList
      .map((question) => (
        <CommunityListComponent key={question.id} question={question} navigation={this.props.navigation}/>),
      );

    return (
      <Fragment>
        <NavigationEvents onWillFocus={this.fetchData} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...ApplicationStyles.mainContainer, paddingHorizontal: scaleSize(12)}}
        >
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
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('BulletinList')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#E9C58F', '#F4E1BD']}
                style={{
                  ...ApplicationStyles.flexRow,
                  justifyContent: 'space-between',
                  width: '100%',
                  height: scaleSize(35),
                  marginVertical: scaleSize(12),
                  paddingHorizontal: scaleSize(8),
                  borderRadius: scaleSize(4),
                }}>
                <View style={{...ApplicationStyles.flexRow}}>
                  <Image source={require('../../../Images/tab_find_images/bulletin_icon.png')} />
                  <Text style={{color: '#FFF', fontSize: setSpText2(15), fontWeight: 'bold'}}>
                    布告栏
                  </Text>
                </View>
                <Icon size={setSpText2(12)} color={'#FFF'} name={'right'}/>
              </LinearGradient>
            </TouchableWithoutFeedback>
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
          <View style={styles.specialColumnListView}>
            {specialColumnList.map((specialColumn, index) => (
              <Fragment key={specialColumn.id}>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate('SpecialColumnDetail', {id: specialColumn.id})}>
                  <View style={styles.specialColumnView}>
                    {specialColumn.pic ? (
                      <Image
                        resizeMode={'cover'}
                        style={styles.specialColumnCover}
                        source={{uri: `${specialColumn.pic}/banner_medium`}}
                      />
                    ) : null}
                    <Text numberOfLines={2} style={{...ApplicationStyles.contentListTitle}}>
                      {specialColumn.name}
                    </Text>
                    <View style={styles.specialColumnInfoView}>
                      <View>
                        <Text style={styles.specialColumnInfoText}>
                          {specialColumn.column_buy_count}人已加入学习
                        </Text>
                        <Text style={styles.specialColumnInfoText}>
                          已更新{specialColumn.count}节/共{specialColumn.course_total_count}节
                        </Text>
                      </View>
                      <View style={{...styles.subscribeButton}}>
                        <Text style={{...styles.subscribeButtonText, ...styles.subscribeButtonTip}}>
                          订阅专栏
                        </Text>
                        <Text style={{...styles.subscribeButtonText, ...styles.subscribeButtonPrice}}>
                          {specialColumn.column_price / 100}元/
                          <Text style={{...styles.subscribeButtonUnit}}>
                            {specialColumn.course_total_count}节
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.catalogTitle}>专栏课程目录</Text>
                <ScrollView
                  horizontal={true}
                  snapToInterval={scaleSize(295)}
                  showsHorizontalScrollIndicator={false}>
                  {specialColumn.curriculums.map((curriculumList, curriculumIndex) => (
                    <View
                      key={curriculumIndex}
                      style={curriculumIndex === specialColumn.length - 1 ?
                        {...styles.curriculumColumn, width: scaleSize(351)} :
                        {...styles.curriculumColumn}}>
                      {curriculumList.map((curriculum) => (
                        <TouchableWithoutFeedback
                          key={curriculum.curriculum_id}
                          onPress={
                            () => this.props.navigation.navigate(
                              'CourseDetail',
                              {id: curriculum.curriculum_id, columnId: specialColumn.id},
                              )
                          }>
                          <View style={styles.courseView}>
                            <View style={styles.keyWordView}>
                              <Text style={styles.keyWord}>{curriculum.key_word}</Text>
                            </View>
                            <View>
                              <Text
                                numberOfLines={2}
                                style={styles.courseTitle}>
                                {curriculum.curriculum_name}
                              </Text>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={styles.coursePrice}>{curriculum.present_price / 100}元/单节</Text>
                                <Text style={styles.courseLearnNumber}>{curriculum.buy_count}人学习</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      ))}
                    </View>
                  ))}
                </ScrollView>
                {index !== specialColumnList.length - 1 && (
                  <View style={{...ApplicationStyles.hr, marginLeft: scaleSize(-12)}} />
                )}
              </Fragment>
            ))}
          </View>
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
    getCurriculumlist()
      .then((res) => {
        function splitList(list) {
          const { length } = list;
          const newList: any[] = [];
          for (let i = 0; i < length; i += 3) {
            newList.push(list.slice(i, i + 3));
          }
          return newList;
        }
        this.setState({
          specialColumnList: res.data.map((item, index) => ({
            ...item,
            curriculums: splitList(item.curriculums),
            current: index % 3,
            length: Math.ceil(item.curriculums.length / 3),
          })),
        });
      });
  }
}
