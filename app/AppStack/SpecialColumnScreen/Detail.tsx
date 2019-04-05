import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreenProp,  NavigationState} from 'react-navigation';
import CourseListComponent from '../../Components/CourseList';
import {getSpecialColumnInfo} from '../../Services/specialColumn';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceState {
  info;
  direct: {key: number} | {};
  curriculumList: any[];
  chooseType: 1 | 2;
}

interface InterFaceStateParams extends NavigationState {
  params: { id: string; };
}

interface InterfaceProps {
  navigation: NavigationScreenProp<InterFaceStateParams>;
}

export default class SpecialColumnDetail extends Component<InterfaceProps, InterfaceState> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  constructor(prop) {
    super(prop);
    this.state = {
      info: {},
      direct: {},
      curriculumList: [],
      chooseType: 2,
    };
  }

  public componentDidMount(): void {
    const { id } = this.props.navigation.state.params;
    getSpecialColumnInfo({id})
      .then((res) => {
        this.setState({
          info: res.info,
          direct: res.direct,
          curriculumList: res.curriculum_list,
        });
      });
  }

  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    const { info, curriculumList, chooseType } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[3]}
          automaticallyAdjustContentInsets={false}
          style={{flex: 1}}>
          {info.pic ? <Image resizeMode={'cover'} source={{uri: info.pic}} style={styles.cover} /> : null}
          <View style={styles.baseInfoView}>
            <View style={{...ApplicationStyles.flexRow}}>
              <View style={styles.tipView}>
                <Text style={styles.tip}>专栏</Text>
              </View>
              <Text style={styles.title}>{info.name}</Text>
            </View>
            <View style={styles.headerDesc}>
              <Text numberOfLines={3} style={styles.summary}>{info.summary}</Text>
              <View>
                <Text><Text>{info.buy_count}</Text>人</Text>
                <Text>已学习</Text>
              </View>
            </View>
          </View>
          <View style={{...ApplicationStyles.hr, marginLeft: 0}} />
          <View style={styles.tabView}>
            <View style={ApplicationStyles.flexRow}>
              <TouchableWithoutFeedback onPress={() => this.setState({chooseType: 1})}>
                <View style={styles.tabButton}>
                  <Text
                    style={
                      chooseType === 1 ?
                        {...styles.buttonText, ...styles.activeButtonText} :
                        {...styles.buttonText, ...styles.inactiveButtonText}}
                  >
                    专栏详情
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({chooseType: 2})}>
                <View style={styles.tabButton}>
                  <Text
                    style={
                      chooseType === 2 ?
                        {...styles.buttonText, ...styles.activeButtonText} :
                        {...styles.buttonText, ...styles.inactiveButtonText}}
                  >
                    专栏目录
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={chooseType === 2 ? {...styles.infoView, display: 'none'} : {...styles.infoView}}>
          </View>
          <View style={chooseType === 1 ? {...styles.infoView, display: 'none'} : {...styles.infoView}}>
            {curriculumList.map((course, index) => (
              <CourseListComponent
                key={course.curriculum_id}
                course={course}
                recommend={false}
                borderBottom={index !== curriculumList.length - 1}
                // @ts-ignore
                navigation={this.props.navigation}>
              </CourseListComponent>
            ))}
          </View>
        </ScrollView>
        <View style={{height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        </View>
      </SafeAreaView>
    );
  }
}
