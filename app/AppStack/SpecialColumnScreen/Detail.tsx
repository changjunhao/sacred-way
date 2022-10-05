import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import CourseListComponent from '../../Components/CourseList';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getSpecialColumnInfo} from '../../Services/specialColumn';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from './Styles';

const SpecialColumnDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [info, setInfo] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direct, setDirect] = useState({});
  const [chooseType, setChooseType] = useState(2);
  const [description, setDescription] = useState<any>([]);
  const [curriculumList, setCurriculumList] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (route?.params?.id) {
      // @ts-ignore
      const {id} = route.params;
      getSpecialColumnInfo({id}).then(async res => {
        setInfo(res.info);
        setDirect(res.direct);
        setCurriculumList(res.curriculum_list);
        navigation.setOptions({
          // @ts-ignore
          title: res.info.name,
        });
        const descriptionRaw = JSON.parse(res.info.description) || [];
        const infoPromiseArray = descriptionRaw.map((item: any) =>
          getInfo(item),
        );
        const infos: any[] = await Promise.all(infoPromiseArray);
        setDescription(infos);
      });
    }
  }, [route.params]); // eslint-disable-line react-hooks/exhaustive-deps

  const getInfo = (originInfo: any) => {
    return new Promise(async resolve => {
      if (originInfo.type === 3 && originInfo.value.length !== 0) {
        const infoPromiseArray = originInfo.value.map((item: any) =>
          getImageInfo(item),
        );
        const infos: any[] = await Promise.all(infoPromiseArray);
        resolve({...originInfo, value: infos});
      } else {
        resolve({...originInfo, width: 0, height: 0});
      }
    });
  };

  const getImageInfo = (originInfo: any) => {
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
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[3]}
        automaticallyAdjustContentInsets={false}
        style={{flex: 1}}>
        {
          // @ts-ignore
          !info.pic ? null : (
            <Image
              resizeMode={'cover'}
              // @ts-ignore
              source={{uri: `${info.pic}/banner_medium`}}
              style={styles.cover}
            />
          )
        }
        <View style={styles.baseInfoView}>
          <View
            style={{
              ...ApplicationStyles.flexRow,
            }}>
            <View style={styles.tipView}>
              <Text style={styles.tip}>专栏</Text>
            </View>
            <Text style={styles.title}>
              {
                // @ts-ignore
                info.name
              }
            </Text>
          </View>
          <View style={styles.headerDesc}>
            <Text numberOfLines={3} style={styles.summary}>
              {
                // @ts-ignore
                info.summary
              }
            </Text>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerDescNumber}>
                {
                  // @ts-ignore
                  info.course_count
                }
                /
                {
                  // @ts-ignore
                  info.course_total_count
                }
                <Text style={styles.headerDescUnit}>节</Text>
              </Text>
              <Text style={styles.headerDescTip}>已更新/总课时</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerDescNumber}>
                {
                  // @ts-ignore
                  info.buy_count
                }
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
            <TouchableWithoutFeedback onPress={() => setChooseType(1)}>
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
            <TouchableWithoutFeedback onPress={() => setChooseType(2)}>
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
          {description.map(
            (
              item: {type: number; value: {} | null | undefined},
              index: React.Key | null | undefined,
            ) => (
              <View key={index}>
                {
                  // @ts-ignore
                  item.type === 1 ? (
                    <View style={styles.descriptionContentView}>
                      <Text style={styles.descriptionTitle}>
                        {item.value as unknown as string}
                      </Text>
                    </View>
                  ) : null
                }
                {
                  // @ts-ignore
                  item.type === 2 ? (
                    <View style={styles.descriptionContentView}>
                      <Text style={styles.descriptionText}>
                        {item.value as unknown as string}
                      </Text>
                    </View>
                  ) : null
                }
                {
                  // @ts-ignore
                  item.type === 3 ? (
                    <View style={styles.descriptionContentView}>
                      {
                        // @ts-ignore
                        item.value.map(
                          (image: {
                            url: string;
                            height: number;
                            width: number;
                          }) => (
                            <Image
                              key={image.url}
                              source={{uri: image.url}}
                              style={{
                                width: scaleSize(343),
                                height: (image.height * 343) / image.width,
                              }}
                            />
                          ),
                        )
                      }
                    </View>
                  ) : null
                }
              </View>
            ),
          )}
        </View>
        <View
          style={
            chooseType === 1
              ? {...styles.infoView, display: 'none'}
              : {...styles.infoView}
          }>
          {curriculumList.map((course, index) => (
            <CourseListComponent
              // @ts-ignore
              key={course.curriculum_id}
              course={course}
              recommend={false}
              borderBottom={index !== curriculumList.length - 1}
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
            {
              // @ts-ignore
              !info.is_buy && Number(info.present_price) !== 0 && (
                <>
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
                      ¥
                      {
                        // @ts-ignore
                        info.present_price / 100
                      }
                    </Text>
                  </View>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      color: '#FEDAAF',
                      fontSize: setSpText2(13),
                    }}>
                    {
                      // @ts-ignore
                      info.original_price
                        ? // @ts-ignore
                          `¥${(info.original_price / 100).toFixed(2)}`
                        : ''
                    }
                  </Text>
                </>
              )
            }
            {
              // @ts-ignore
              !info.is_buy && Number(info.present_price) === 0 && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  免费
                </Text>
              )
            }
            {
              // @ts-ignore
              !!info.is_buy && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  查看专栏
                </Text>
              )
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default SpecialColumnDetail;
