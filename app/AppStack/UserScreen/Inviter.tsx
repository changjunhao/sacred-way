import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getDirectUser} from '../../Services/distribution';
import styles from './Styles';

const Inviter: React.FC = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getDirectUser({page, pageSize: limit}).then(res => {
      if (!res || !res.list) { return; }
      setList(prev => (page === 1 ? res.list : prev.concat(res.list)));
      setCount(res.count);
    });
  }, [page, limit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onEndReached = () => {
    if (page >= count / limit) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          目前，已成功邀请
          <Text style={styles.countStyle}>{count}</Text>人
        </Text>
      </View>
      <FlatList
        style={styles.listView}
        data={list}
        onEndReached={onEndReached}
        // @ts-ignore
        keyExtractor={item => item.user_id.toString()}
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
                绑定时间：
                {
                  // @ts-ignore
                  item.create_time
                }
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Inviter;
