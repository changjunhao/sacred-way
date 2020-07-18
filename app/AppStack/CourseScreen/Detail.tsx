import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getCourseDetail, getSubCurriculum} from '../../Services/course';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from '../SpecialColumnScreen/Styles';

interface InterfaceState {
  baseInfo: any;
  childList: any[];
  chooseType: 0 | 1 | 2;
  description: any[];
}

type StackParamList = {
  CourseDetail: {id: string; columnId: string | undefined};
};

type ScreenRouteProp = RouteProp<StackParamList, 'CourseDetail'>;

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

export default class CourseDetail extends Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(prop: Readonly<InterfaceProps>) {
    super(prop);
    this.state = {
      baseInfo: {},
      chooseType: 0,
      description: [],
      childList: [],
    };
  }

  public componentDidMount(): void {
    const {id, columnId} = this.props.route.params;
    getCourseDetail({id, column_id: columnId}).then(
      async (res: {type: number; description: string}) => {
        // console.log(res);
        this.setState({
          baseInfo: res,
        });
        if (res.type === 2) {
          getSubCurriculum({id}).then((data) => {
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
        const description = JSON.parse(res.description) || [];
        const infoPromiseArray = description.map((item: any) =>
          this.getInfo(item),
        );
        const infos: any[] = await Promise.all(infoPromiseArray);
        this.setState({
          description: infos,
        });
      },
    );
  }

  public getInfo(originInfo: any) {
    return new Promise(async (resolve) => {
      if (originInfo.type === 3 && originInfo.value.length !== 0) {
        const infoPromiseArray = originInfo.value.map((item: any) =>
          this.getImageInfo(item),
        );
        const infos: any[] = await Promise.all(infoPromiseArray);
        resolve({...originInfo, value: infos});
      } else {
        resolve({...originInfo, width: 0, height: 0});
      }
    });
  }

  public getImageInfo(originInfo: any) {
    return new Promise((resolve) => {
      Image.getSize(
        originInfo,
        (width, height) => {
          resolve({url: originInfo, width, height});
        },
        () => {
          resolve({url: originInfo, width: 0, height: 0});
        },
      );
    });
  }

  public render() {
    const {baseInfo, description, chooseType, childList} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[3]}
          automaticallyAdjustContentInsets={false}
          style={{flex: 1}}>
          {baseInfo.pic ? (
            <Image
              resizeMode={'cover'}
              source={{uri: `${baseInfo.pic}/banner_medium`}}
              style={styles.cover}
            />
          ) : null}
          <View
            style={{
              paddingVertical: scaleSize(14),
              paddingHorizontal: scaleSize(16),
            }}>
            <Text
              style={{
                color: '#272A32',
                fontSize: setSpText2(18),
                paddingBottom: scaleSize(14),
              }}>
              {baseInfo.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...styles.summary,
                  ...styles.courseSummary,
                }}>
                {baseInfo.summary}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headerDescNumber}>
                  {baseInfo.buy_count}
                  <Text style={styles.headerDescUnit}>人</Text>
                </Text>
                <Text style={styles.headerDescTip}>已学习</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              ...ApplicationStyles.hr,
              marginLeft: 0,
            }}
          />
          <View style={styles.tabView}>
            <View style={ApplicationStyles.flexRow}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({chooseType: 1})}>
                <View style={styles.tabButton}>
                  <Text
                    style={
                      chooseType === 1
                        ? {...styles.buttonText, ...styles.activeButtonText}
                        : {...styles.buttonText, ...styles.inactiveButtonText}
                    }>
                    课程详情
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              {baseInfo.type === 1 ? null : (
                <TouchableWithoutFeedback
                  onPress={() => this.setState({chooseType: 2})}>
                  <View style={styles.tabButton}>
                    <Text
                      style={
                        chooseType === 2
                          ? {...styles.buttonText, ...styles.activeButtonText}
                          : {...styles.buttonText, ...styles.inactiveButtonText}
                      }>
                      课程目录
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View
            style={
              chooseType === 2
                ? {...styles.infoView, display: 'none'}
                : {...styles.infoView}
            }>
            {description.map((item, index) => (
              <View key={index}>
                {item.type === 1 ? (
                  <View style={{paddingBottom: scaleSize(7)}}>
                    <Text
                      style={{
                        color: '#272A32',
                        fontSize: setSpText2(17),
                        fontWeight: '600',
                        lineHeight: setSpText2(24),
                      }}>
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
                        lineHeight: setSpText2(22.5),
                      }}>
                      {item.value}
                    </Text>
                  </View>
                ) : null}
                {item.type === 3 ? (
                  <View style={{paddingBottom: scaleSize(7)}}>
                    {item.value.map(
                      (image: {url: string; height: number; width: number}) => (
                        <Image
                          key={image.url}
                          source={{uri: image.url}}
                          style={{
                            width: scaleSize(343),
                            height: (image.height * 343) / image.width,
                          }}
                        />
                      ),
                    )}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
          <View
            style={
              chooseType === 1
                ? {...styles.infoView, display: 'none'}
                : {...styles.infoView}
            }>
            {childList.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: scaleSize(10),
                  backgroundColor: '#f8f8f8',
                  marginBottom: scaleSize(6),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: scaleSize(220),
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: setSpText2(15)}}>{item.name}</Text>
                  <Text
                    style={{
                      color: '#999',
                      fontSize: setSpText2(12),
                    }}>
                    {item.type_name}：时长{item.duration}分钟
                  </Text>
                </View>
                <Image
                  source={{uri: `${item.pic}/thumb_medium`}}
                  style={{
                    width: scaleSize(100),
                    height: scaleSize(66),
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            height: scaleSize(50),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#e6e5eb',
                width: scaleSize(93),
                height: scaleSize(41),
                borderRadius: scaleSize(20.5),
              }}>
              <Text
                style={{
                  fontSize: setSpText2(11),
                  lineHeight: scaleSize(41),
                  textAlign: 'center',
                }}>
                联系课代表
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: scaleSize(269),
                height: scaleSize(41),
                borderRadius: scaleSize(20.5),
                backgroundColor: '#f26522',
              }}>
              {!baseInfo.is_buy && Number(baseInfo.present_price) !== 0 && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  立即购买
                </Text>
              )}
              {!baseInfo.is_buy && Number(baseInfo.present_price) === 0 && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  免费
                </Text>
              )}
              {!!baseInfo.is_buy && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  查看课程
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}
