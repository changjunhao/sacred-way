import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import Icon from 'react-native-vector-icons/AntDesign';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getCommunityInfo} from '../../Services/community';

const colorSet = [
  {
    font: '#fff',
    back: ['#e49184', '#f5aba1'],
  },
  {
    font: '#fff',
    back: ['#8db7e0', '#a1c6ea'],
  },
  {
    font: '#fff',
    back: ['#d3b383', '#f6d7a9'],
  },
  {
    font: '#fff',
    back: ['#5baeb7', '#8fcdd4'],
  },
  {
    font: '#fff',
    back: ['#aacca6', '#c6dec0'],
  },
  {
    font: '#fff',
    back: ['#f7bd7f', '#fdd2a4'],
  },
  {
    font: '#fff',
    back: ['#c9a2ce', '#eebff5'],
  },
  {
    font: '#fff',
    back: ['#e8b658', '#f7cb79'],
  },
  {
    font: '#fff',
    back: ['#bfbfbf', '#e4e4e4'],
  },
  {
    font: '#fff',
    back: ['#eb97d6', '#ffafeb'],
  },
];

const CommunityDetailScreen: React.FC = () => {
  const route = useRoute();

  const [data, setData] = useState({
    title: '',
    groupName: '',
    readCount: 0,
    list: [],
    publishTime: '',
    screenshots: '',
    modalVisible: false,
    imageModalVisible: false,
    currentImage: {},
  });

  useEffect(() => {
    // @ts-ignore
    if (route?.params?.id) {
      // @ts-ignore
      const {id} = route.params;
      getCommunityInfo({id}).then(async res => {
        const infoPromiseArray = res.list.map((item: any) => getInfo(item));
        const infos: any[] = await Promise.all(infoPromiseArray);
        const userIds = [...new Set(infos.map(item => item.nick_name))];
        setData({
          ...data,
          title: res.title,
          groupName: res.group_name,
          readCount: res.read_count,
          // @ts-ignore
          list: infos.map(item => ({
            ...item,
            color: colorSet[userIds.indexOf(item.nick_name) % 10],
          })),
          publishTime: res.publish_time,
          screenshots: res.screenshots,
        });
      });
    }
  }, [route.params]); // eslint-disable-line react-hooks/exhaustive-deps

  const getInfo = (originInfo: any) => {
    return new Promise(resolve => {
      if (originInfo.type === 'IMAGE' && originInfo.content) {
        Image.getSize(
          originInfo.content,
          (width, height) => {
            resolve({...originInfo, width, height});
          },
          () => {
            resolve({...originInfo, width: 0, height: 0});
          },
        );
      } else {
        resolve({...originInfo, width: 0, height: 0});
      }
    });
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#f0f0f0',
          padding: scaleSize(16),
        }}>
        <ImageBackground
          source={require('../../Images/watermark.png')}
          style={{
            minHeight: '100%',
            width: '100%',
          }}
          imageStyle={{
            resizeMode: 'repeat',
            opacity: 1,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#222',
              fontSize: setSpText2(17),
              lineHeight: scaleSize(20),
            }}>
            {data?.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#555',
                fontSize: setSpText2(12),
              }}>
              共{data?.list.length}对话 来自：{data?.groupName}
            </Text>
            <Text
              style={{
                color: '#a0a0a0',
                fontSize: setSpText2(12),
              }}>
              {data?.readCount}次学习
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: scaleSize(42.5),
              marginBottom: scaleSize(25),
            }}>
            <View
              style={{
                backgroundColor: '#ded9d9',
                height: scaleSize(1),
                width: scaleSize(90),
              }}
            />
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#a5a5a5',
                  fontSize: setSpText2(12),
                }}>
                以下为群内对话摘录
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#ded9d9',
                height: scaleSize(1),
                width: scaleSize(90),
              }}
            />
          </View>
          {data?.list
            // @ts-ignore
            .filter(item => item.content)
            .map(item => (
              <View
                // @ts-ignore
                key={item.id}
                style={{
                  flexDirection: 'row',
                  marginBottom: scaleSize(14),
                }}>
                <LinearGradient
                  // @ts-ignore
                  colors={item.color.back}
                  style={{
                    width: scaleSize(40),
                    height: scaleSize(40),
                  }}>
                  <Text
                    style={{
                      lineHeight: scaleSize(40),
                      textAlign: 'center',
                      fontSize: setSpText2(18),
                      fontWeight: 'bold',
                      // @ts-ignore
                      color: item.color.font,
                    }}>
                    {
                      // @ts-ignore
                      item.nick_name.trim().substr(0, 1)
                    }
                  </Text>
                </LinearGradient>
                <View style={{paddingLeft: scaleSize(9)}}>
                  <Text
                    style={{
                      color: '#666',
                      fontSize: setSpText2(12),
                      marginBottom: scaleSize(4),
                    }}>
                    {
                      // @ts-ignore
                      item.nick_name
                    }
                    <Text> @{data?.groupName}</Text>
                  </Text>
                  {
                    // @ts-ignore
                    item.type === 'IMAGE' ? (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          setData({
                            ...data,
                            imageModalVisible: true,
                            currentImage: item,
                          })
                        }>
                        <Image
                          style={{
                            width: scaleSize(125),
                            // @ts-ignore
                            height: scaleSize((item.height * 125) / item.width),
                            borderRadius: scaleSize(4),
                          }}
                          // @ts-ignore
                          source={{uri: item.content}}
                        />
                      </TouchableWithoutFeedback>
                    ) : (
                      <View
                        style={{
                          maxWidth: scaleSize(238),
                          backgroundColor: '#FFF',
                          paddingHorizontal: scaleSize(14),
                          paddingVertical: scaleSize(12),
                        }}>
                        <Text
                          selectable={true}
                          style={{
                            fontSize: setSpText2(17),
                            lineHeight: scaleSize(22),
                          }}>
                          {
                            // @ts-ignore
                            item.content.replace(/<br\/>/g, '\n')
                          }
                        </Text>
                      </View>
                    )
                  }
                </View>
              </View>
            ))}
          <View
            style={{
              marginTop: scaleSize(30),
              marginBottom: scaleSize(44),
            }}>
            <TouchableWithoutFeedback
              onPress={() => setData({...data, modalVisible: true})}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: setSpText2(12),
                  fontWeight: 'bold',
                  color: '#555',
                }}>
                也想加入干货讨论？
                <Text style={{color: '#f26522'}}>点击这里</Text>
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={data?.modalVisible}
        onRequestClose={() => {
          // alert('Modal has been closed.');
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(37,38,45,.7)',
          }}>
          <Image
            style={{
              width: scaleSize(250),
              height: scaleSize(250),
            }}
            source={require('../../Images/Wechat.jpeg')}
          />
          <TouchableWithoutFeedback
            onPress={() => setData({...data, modalVisible: false})}>
            <Icon
              style={{marginTop: scaleSize(30)}}
              size={scaleSize(25)}
              color="#FFF"
              name={'close'}
            />
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
      <Modal
        animationType="fade"
        visible={data?.imageModalVisible}
        onRequestClose={() => {
          // alert('Modal has been closed.');
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <TouchableWithoutFeedback
            onPress={() => setData({...data, imageModalVisible: false})}>
            <Image
              style={{
                width: scaleSize(375),
                height: scaleSize(
                  // @ts-ignore
                  (data?.currentImage?.height * 375) / data?.currentImage.width,
                ),
              }}
              // @ts-ignore
              source={{uri: data?.currentImage.content}}
            />
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default CommunityDetailScreen;
