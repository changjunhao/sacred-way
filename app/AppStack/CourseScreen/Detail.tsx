import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text, TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getCourseDetail, getSubCurriculum} from '../../Services/course';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from '../SpecialColumnScreen/Styles';

interface InterfaceState {
  baseInfo;
  childList: any[];
  chooseType: 0 | 1 | 2;
  description: any[];
}

interface InterFaceStateParams extends NavigationState {
  params: { id: string; columnId: string | undefined };
}

interface InterfaceProps {
  navigation: NavigationScreenProp<InterFaceStateParams>;
}

export default class CourseDetail extends Component<InterfaceProps, InterfaceState> {
  constructor(prop) {
    super(prop);
    this.state = {
      baseInfo: {},
      chooseType: 0,
      description: [],
      childList: [],
    };
  }

  public componentDidMount(): void {
    const { id, columnId } = this.props.navigation.state.params;
    getCourseDetail({id, column_id: columnId})
      .then((res) => {
        // console.log(res);
        this.setState({
          baseInfo: res,
          description: JSON.parse(res.description),
        });
        if (res.type === 2) {
          getSubCurriculum({id})
            .then((data) => {
              this.setState({
                childList: data.list,
                chooseType: 2,
              });
            });
        } else {
          this.setState({
            chooseType: 1,
          });
        }
      });
  }

  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    const { baseInfo, description, chooseType, childList } = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[3]}
          automaticallyAdjustContentInsets={false}
          style={{flex: 1}}>
          {baseInfo.pic ? <Image resizeMode={'cover'} source={{uri: baseInfo.pic}} style={styles.cover} /> : null}
          <View style={{paddingVertical: scaleSize(14), paddingHorizontal: scaleSize(16)}}>
            <Text style={{color: '#272A32', fontSize: setSpText2(18), paddingBottom: scaleSize(14)}}>
              {baseInfo.name}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{width: scaleSize(251.5)}}>{baseInfo.summary}</Text>
              <View>
                <Text><Text>{baseInfo.buy_count}</Text>人</Text>
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
                    课程详情
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {baseInfo.type === 1 ? null : (
                <TouchableWithoutFeedback onPress={() => this.setState({chooseType: 2})}>
                  <View style={styles.tabButton}>
                    <Text
                      style={
                        chooseType === 2 ?
                          {...styles.buttonText, ...styles.activeButtonText} :
                          {...styles.buttonText, ...styles.inactiveButtonText}}
                    >
                      课程目录
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View style={chooseType === 2 ? {...styles.infoView, display: 'none'} : {...styles.infoView}}>
            {
              description.map((item, index) => (
                <View key={index}>
                  {item.type === 1 ? (
                    <View style={{paddingBottom: scaleSize(7)}}>
                      <Text
                        style={{
                          color: '#272A32',
                          fontSize: setSpText2(17),
                          fontWeight: '600',
                          lineHeight: setSpText2(24)}}>
                        {item.value}
                      </Text>
                    </View>
                  ) : null}
                  {item.type === 2 ? (
                    <View style={{paddingBottom: scaleSize(7)}}>
                      <Text
                        style={{
                          color: '#666',
                          fontSize: setSpText2(15),
                          lineHeight: setSpText2(22.5)}}>
                        {item.value}
                      </Text>
                    </View>
                  ) : null}
                  {item.type === 3 ? (
                    <View style={{paddingBottom: scaleSize(7)}}>
                      <Image source={{uri: item.value[0]}} style={{width: scaleSize(343)}} />
                    </View>
                  ) : null}
                </View>
              ))
            }
          </View>
          <View style={chooseType === 1 ? {...styles.infoView, display: 'none'} : {...styles.infoView}}>
            {childList.map((item) => (
                <View
                  key={item.id} style={{backgroundColor: '#f8f8f8', height: scaleSize(95), marginBottom: scaleSize(6)}}>
                  <Image source={{uri: item.pic}} style={{width: scaleSize(100), height: scaleSize(66) }} />
                </View>
              ))
            }
          </View>
        </ScrollView>
        <View
          style={{height: scaleSize(50), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#e6e5eb',
                width: scaleSize(93),
                height: scaleSize(41),
                borderRadius: scaleSize(20.5)}}>
              <Text style={{fontSize: setSpText2(11), lineHeight: scaleSize(41), textAlign: 'center'}}>联系课代表</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={{
                width: scaleSize(269),
                height: scaleSize(41),
                borderRadius: scaleSize(20.5),
                backgroundColor: '#f26522'}}>
              {
                !baseInfo.is_buy && Number(baseInfo.present_price) !== 0 && (
                  <Text
                    style={{color: '#FFF', fontSize: setSpText2(15), lineHeight: scaleSize(41), textAlign: 'center'}}>
                    立即购买
                  </Text>
                )
              }
              {
                !baseInfo.is_buy && Number(baseInfo.present_price) === 0 && (
                  <Text
                    style={{color: '#FFF', fontSize: setSpText2(15), lineHeight: scaleSize(41), textAlign: 'center'}}>
                    免费
                  </Text>
                )
              }
              {
                !!baseInfo.is_buy && (
                  <Text
                    style={{color: '#FFF', fontSize: setSpText2(15), lineHeight: scaleSize(41), textAlign: 'center'}}>
                    查看课程
                  </Text>
                )
              }
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}
