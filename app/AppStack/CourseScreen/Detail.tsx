import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getCourseDetail, getSubCurriculum} from '../../Services/course';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from '../SpecialColumnScreen/Styles';

const CourseDetail: React.FC = () => {
  const route = useRoute();
  const [baseInfo, setBaseInfo] = useState({});
  const [chooseType, setChooseType] = useState(0);
  const [description, setDescription] = useState([]);
  const [childList, setChildList] = useState([]);

  useEffect(() => {
    // @ts-ignore
    if (route?.params?.id) {
      // @ts-ignore
      const {id, columnId} = route.params;
      getCourseDetail({id, column_id: columnId}).then(
        async (res: {type: number; description: string}) => {
          // console.log(res);
          setBaseInfo(res);
          if (res.type === 2) {
            getSubCurriculum({id}).then(data => {
              setChildList(data.list);
              setChooseType(2);
            });
          } else {
            setChooseType(1);
          }
          const descriptionRaw = JSON.parse(res.description) || [];
          const infoPromiseArray = descriptionRaw.map((item: any) =>
            getInfo(item),
          );
          const infos: never[] = await Promise.all(infoPromiseArray);
          setDescription(infos);
        },
      );
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
          baseInfo.pic ? (
            <Image
              resizeMode={'cover'}
              // @ts-ignore
              source={{uri: `${baseInfo.pic}/banner_medium`}}
              style={styles.cover}
            />
          ) : null
        }
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
            {
              // @ts-ignore
              baseInfo.name
            }
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
              {
                // @ts-ignore
                baseInfo.summary
              }
            </Text>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerDescNumber}>
                {
                  // @ts-ignore
                  baseInfo.buy_count
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
                  课程详情
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {
              // @ts-ignore
              baseInfo.type === 1 ? null : (
                <TouchableWithoutFeedback onPress={() => setChooseType(2)}>
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
              )
            }
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
              {
                // @ts-ignore
                item.type === 1 ? (
                  <View style={{paddingBottom: scaleSize(7)}}>
                    <Text
                      style={{
                        color: '#272A32',
                        fontSize: setSpText2(17),
                        fontWeight: '600',
                        lineHeight: setSpText2(24),
                      }}>
                      {
                        // @ts-ignore
                        item.value
                      }
                    </Text>
                  </View>
                ) : null
              }
              {
                // @ts-ignore
                item.type === 2 ? (
                  <View style={{paddingBottom: scaleSize(7)}}>
                    <Text
                      style={{
                        color: '#666',
                        fontSize: setSpText2(15),
                        lineHeight: setSpText2(22.5),
                      }}>
                      {
                        // @ts-ignore
                        item.value
                      }
                    </Text>
                  </View>
                ) : null
              }
              {
                // @ts-ignore
                item.type === 3 ? (
                  <View style={{paddingBottom: scaleSize(7)}}>
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
          ))}
        </View>
        <View
          style={
            chooseType === 1
              ? {...styles.infoView, display: 'none'}
              : {...styles.infoView}
          }>
          {childList.map(item => (
            <View
              // @ts-ignore
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
                <Text style={{fontSize: setSpText2(15)}}>
                  {
                    // @ts-ignore
                    item.name
                  }
                </Text>
                <Text
                  style={{
                    color: '#999',
                    fontSize: setSpText2(12),
                  }}>
                  {
                    // @ts-ignore
                    item.type_name
                  }
                  ：时长
                  {
                    // @ts-ignore
                    item.duration
                  }
                  分钟
                </Text>
              </View>
              <Image
                // @ts-ignore
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
            {
              // @ts-ignore
              !baseInfo.is_buy && Number(baseInfo.present_price) !== 0 && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  立即购买
                </Text>
              )
            }
            {
              // @ts-ignore
              !baseInfo.is_buy && Number(baseInfo.present_price) === 0 && (
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
              !!baseInfo.is_buy && (
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: setSpText2(15),
                  }}>
                  查看课程
                </Text>
              )
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

export default CourseDetail;
