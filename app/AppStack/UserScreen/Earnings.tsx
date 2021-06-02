import React, {Component} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {getUserIoList} from '../../Services/distribution';
import styles from './Styles';

interface InterfaceState {
  list: any[];
  page: number;
  limit: number;
  count: number;
}

export default class Earnings extends Component<{}, InterfaceState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      limit: 50,
      count: 0,
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const {list} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={styles.listView}
          data={list}
          onEndReached={this.onEndReached}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.itemHr} />}
          renderItem={({item}) => (
            <View style={styles.itemView}>
              <Image source={{uri: item.head_img}} style={styles.avatar} />
              <View style={{flex: 1}}>
                <Text style={styles.name}>
                  {item.nick_name}
                  <Text style={styles.realName}>（{item.real_name}）</Text>
                </Text>
                <Text style={styles.info}>购买时间：{item.create_time}</Text>
                <Text style={styles.info}>购买课程：{item.name}</Text>
              </View>
              <Text style={styles.earningMoney}>+ ¥ {item.price / 100}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  private fetchData = () => {
    getUserIoList({page: this.state.page, pageSize: this.state.limit}).then(
      res => {
        this.setState({
          list: res.list,
          count: res.count,
        });
      },
    );
  };

  private onEndReached = () => {
    if (this.state.page >= this.state.count / this.state.limit) {
      return;
    }
    this.setState({page: this.state.page + 1}, () => {
      getUserIoList({page: this.state.page, pageSize: this.state.limit}).then(
        res => {
          this.setState({
            list: this.state.list.concat(res.list),
            count: res.count,
          });
        },
      );
    });
  };
}
