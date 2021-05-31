import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getBulletinList} from '../../Services/bulletin';

const BulletinListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [bulletinList, setBulletinList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getBulletinList({page, count: 10}).then(res => {
      if (page === 1) {
        setBulletinList(res.list);
      } else {
        setBulletinList(bulletinList.concat(res.list));
      }
      setCount(res.count);
      setRefreshing(false);
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const onRefresh = () => {
    setPage(1);
  };

  const onEndReached = () => {
    if (page >= count / 10) {
      return;
    }
    setPage(page + 1);
  };

  const formatTime = (val: string) => {
    const time = new Date(parseInt(val, 10) * 1000);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const mm = m < 10 ? '0' + m : m;
    const dd = d < 10 ? '0' + d : d;
    return y + '-' + mm + '-' + dd;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{paddingHorizontal: scaleSize(16)}}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        initialNumToRender={10}
        onEndReachedThreshold={0}
        // @ts-ignore
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: scaleSize(1),
              backgroundColor: '#e2e2e2',
            }}
          />
        )}
        data={bulletinList}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('BulletinDetail', {
                // @ts-ignore
                id: item.id,
                // @ts-ignore
                title: item.title,
              });
            }}>
            <View
              style={{
                marginTop: scaleSize(16),
                marginBottom: scaleSize(20),
              }}>
              <Text
                style={{
                  color: '#272a32',
                  fontWeight: 'bold',
                  fontSize: setSpText2(15),
                }}>
                {
                  // @ts-ignore
                  item.title
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: scaleSize(12),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: '#ef3b3b',
                      fontSize: setSpText2(12),
                      borderWidth: scaleSize(1),
                      borderColor: '#ef3b3b',
                      paddingHorizontal: scaleSize(5),
                      paddingVertical: scaleSize(1),
                    }}>
                    {
                      // @ts-ignore
                      item.category_name
                    }
                  </Text>
                  {
                    // @ts-ignore
                    item.is_top === 1 && (
                      <Text
                        style={{
                          color: '#51abff',
                          fontSize: setSpText2(12),
                          borderWidth: scaleSize(1),
                          borderColor: '#51abff',
                          paddingHorizontal: scaleSize(5),
                          paddingVertical: scaleSize(1),
                          marginLeft: scaleSize(5),
                        }}>
                        置顶
                      </Text>
                    )
                  }
                </View>
                <Text
                  style={{
                    color: '#848fac',
                    fontSize: setSpText2(12),
                  }}>
                  {
                    // @ts-ignore
                    formatTime(item.create_time)
                  }
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: '#272a32',
                    fontSize: setSpText2(14),
                    lineHeight: setSpText2(21),
                  }}>
                  {
                    // @ts-ignore
                    item.content.substring(0, 100)
                  }
                  ...
                </Text>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                  {
                    // @ts-ignore
                    item.images.map(
                      (image: any, index: string | number | undefined) => (
                        <Image
                          key={index}
                          style={{
                            width: scaleSize(80),
                            height: scaleSize(80),
                            margin: scaleSize(5),
                          }}
                          source={{uri: `${image}/thumb_medium`}}
                        />
                      ),
                    )
                  }
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
};

export default BulletinListScreen;
