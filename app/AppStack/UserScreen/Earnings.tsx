import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {getUserIoList} from '../../Services/distribution';
import styles from './Styles';

const Earnings: React.FC = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = () => {
    getUserIoList({page, pageSize: limit}).then(res => {
      setList(res.list);
      setCount(res.count);
    });
  };

  useEffect(() => {
    getUserIoList({page, pageSize: limit}).then(res => {
      setList(page === 1 ? res.list : list.concat(res.list));
      setCount(res.count);
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEndReached = () => {
    if (page >= count / limit) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={styles.listView}
        data={list}
        onEndReached={onEndReached}
        // @ts-ignore
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemHr} />}
        renderItem={({item}) => (
          <View style={styles.itemView}>
            <Image
              // @ts-ignore
              source={{uri: item.head_img}}
              style={styles.avatar}
            />
            <View style={{flex: 1}}>
              <Text style={styles.name}>
                {
                  // @ts-ignore
                  item.nick_name
                }
                <Text style={styles.realName}>
                  （
                  {
                    // @ts-ignore
                    item.real_name
                  }
                  ）
                </Text>
              </Text>
              <Text style={styles.info}>
                购买时间：
                {
                  // @ts-ignore
                  item.create_time
                }
              </Text>
              <Text style={styles.info}>
                购买课程：
                {
                  // @ts-ignore
                  item.name
                }
              </Text>
            </View>
            <Text style={styles.earningMoney}>
              + ¥{' '}
              {
                // @ts-ignore
                item.price / 100
              }
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Earnings;
