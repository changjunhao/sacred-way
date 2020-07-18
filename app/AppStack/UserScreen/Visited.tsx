import React, {Component} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {getScanList} from '../../Services/distribution';
import styles from './Styles';

interface InterfaceState {
  list: any[];
  page: number;
  limit: number;
  count: number;
}

export default class Visited extends Component<{}, InterfaceState> {
  public static navigationOptions = {
    title: '浏览用户',
  };

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      limit: 100,
      count: 0,
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const {list, count} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            目前，已有<Text style={styles.countStyle}>{count}</Text>
            人浏览了我的分享
          </Text>
        </View>
        <FlatList
          style={styles.listView}
          data={list}
          onEndReached={this.onEndReached}
          keyExtractor={(item) => item.real_name + item.nick_name}
          ItemSeparatorComponent={() => <View style={styles.itemHr} />}
          renderItem={({item}) => (
            <View style={styles.itemView}>
              <Image source={{uri: item.head_img}} style={styles.avatar} />
              <View style={{flex: 1}}>
                <Text style={styles.name}>
                  {item.nick_name}
                  <Text style={styles.realName}>（{item.real_name}）</Text>
                </Text>
                <Text style={styles.info}>绑定时间：{item.create_time}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  private fetchData = () => {
    getScanList({page: this.state.page, pageSize: this.state.limit}).then(
      (res) => {
        console.log(res);
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
      getScanList({page: this.state.page, pageSize: this.state.limit}).then(
        (res) => {
          this.setState({
            list: this.state.list.concat(res.list),
            count: res.count,
          });
        },
      );
    });
  };
}
