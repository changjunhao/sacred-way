import React, {Component, Fragment} from 'react';
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
import CourseListComponent from '../../Components/CourseList';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getSpecialColumnInfo} from '../../Services/specialColumn';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceState {
  info: any;
  direct: {key: number} | {};
  curriculumList: any[];
  chooseType: 1 | 2;
  description: any[];
}

type StackParamList = {
  SpecialColumnDetail: {id: string};
};

type ScreenRouteProp = RouteProp<StackParamList, 'SpecialColumnDetail'>;

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

export default class SpecialColumnDetail extends Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(prop: Readonly<InterfaceProps>) {
    super(prop);
    this.state = {
      info: {},
      direct: {},
      curriculumList: [],
      chooseType: 2,
      description: [],
    };
  }

  public componentDidMount(): void {
    const {id} = this.props.route.params;
    getSpecialColumnInfo({id}).then(async res => {
      this.setState({
        info: res.info,
        direct: res.direct,
        curriculumList: res.curriculum_list,
      });
      const description = JSON.parse(res.info.description) || [];
      const infoPromiseArray = description.map((item: any) =>
        this.getInfo(item),
      );
      const infos: any[] = await Promise.all(infoPromiseArray);
      this.setState({
        description: infos,
      });
    });
  }

  public getInfo(originInfo: any) {
    return new Promise(async resolve => {
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
    return new Promise(resolve => {
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
    const {info, description, curriculumList, chooseType} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[3]}
          automaticallyAdjustContentInsets={false}
          style={{flex: 1}}>
          {!info.pic ? null : (
            <Image
              resizeMode={'cover'}
              source={{uri: `${info.pic}/banner_medium`}}
              style={styles.cover}
            />
          )}
          <View style={styles.baseInfoView}>
            <View
              style={{
                ...ApplicationStyles.flexRow,
              }}>
              <View style={styles.tipView}>
                <Text style={styles.tip}>专栏</Text>
              </View>
              <Text style={styles.title}>{info.name}</Text>
            </View>
            <View style={styles.headerDesc}>
              <Text numberOfLines={3} style={styles.summary}>
                {info.summary}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headerDescNumber}>
                  {info.course_count}/{info.course_total_count}
                  <Text style={styles.headerDescUnit}>节</Text>
                </Text>
                <Text style={styles.headerDescTip}>已更新/总课时</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headerDescNumber}>
                  {info.buy_count}
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
                    专栏详情
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => this.setState({chooseType: 2})}>
                <View style={styles.tabButton}>
                  <Text
                    style={
                      chooseType === 2
                        ? {...styles.buttonText, ...styles.activeButtonText}
                        : {...styles.buttonText, ...styles.inactiveButtonText}
                    }>
                    专栏目录
                  </Text>
                </View>
              </TouchableWithoutFeedback>
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
                  <View style={styles.descriptionContentView}>
                    <Text style={styles.descriptionTitle}>{item.value}</Text>
                  </View>
                ) : null}
                {item.type === 2 ? (
                  <View style={styles.descriptionContentView}>
                    <Text style={styles.descriptionText}>{item.value}</Text>
                  </View>
                ) : null}
                {item.type === 3 ? (
                  <View style={styles.descriptionContentView}>
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
            {curriculumList.map((course, index) => (
              <CourseListComponent
                key={course.curriculum_id}
                course={course}
                recommend={false}
                borderBottom={index !== curriculumList.length - 1}
                navigation={this.props.navigation}
                purchased
              />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            height: 50,
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
              {!info.is_buy && Number(info.present_price) !== 0 && (
                <Fragment>
                  <Text
                    style={{
                      color: '#FFF',
                      fontSize: setSpText2(15),
                    }}>
                    购买专栏
                  </Text>
                  <View style={{marginHorizontal: scaleSize(9)}}>
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: setSpText2(15),
                      }}>
                      ¥{info.present_price / 100}
                    </Text>
                  </View>
                  {info.original_price && (
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        color: '#FEDAAF',
                        fontSize: setSpText2(13),
                      }}>
                      ¥{(info.original_price / 100).toFixed(2)}
                    </Text>
                  )}
                </Fragment>
              )}
              {!info.is_buy && Number(info.present_price) === 0 && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  免费
                </Text>
              )}
              {!!info.is_buy && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  查看专栏
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    );
  }
}
