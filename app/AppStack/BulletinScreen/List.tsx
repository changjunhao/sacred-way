import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationSwitchScreenProps} from 'react-navigation';
import { scaleSize, setSpText2 } from '../../Lib/ScreenUtil';
import { getBulletinList } from '../../Services/bulletin';

interface InterfaceState {
  bulletinList: any[];
  refreshing: boolean;
  page: number;
  limit: number;
  count: number;
}

interface InterfaceProps extends NavigationSwitchScreenProps<{}> {}

export default class BulletinListScreen extends Component<InterfaceProps, InterfaceState> {
  public static navigationOptions = {
    headerBackTitle: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      bulletinList: [],
      refreshing: false,
      page: 1,
      limit: 10,
      count: 0,
    };
  }

  public componentDidMount() {
    this.fetchData();
  }

  public render() {
    const { bulletinList, refreshing } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={{paddingHorizontal: scaleSize(16)}}
          refreshing={refreshing}
          onRefresh={this.fetchData}
          onEndReached={this.onEndReached}
          initialNumToRender={10}
          onEndReachedThreshold={0}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (<View style={{height: scaleSize(1), backgroundColor: '#e2e2e2'}}/>)}
          data={bulletinList}
          renderItem={({item}) => (
            <TouchableWithoutFeedback
              onPress={() => {this.props.navigation.navigate('BulletinDetail', {id: item.id, title: item.title}); }}>
              <View style={{marginTop: scaleSize(16), marginBottom: scaleSize(20)}}>
                <Text style={{color: '#272a32', fontWeight: 'bold', fontSize: setSpText2(15)}}>{item.title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleSize(12)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#ef3b3b',
                        fontSize: setSpText2(12),
                        borderWidth: scaleSize(1),
                        borderColor: '#ef3b3b',
                        paddingHorizontal: scaleSize(5),
                        paddingVertical: scaleSize(1),
                      }}
                    >
                      {item.category_name}
                    </Text>
                    {item.is_top === 1 && (
                      <Text
                        style={{
                          color: '#51abff',
                          fontSize: setSpText2(12),
                          borderWidth: scaleSize(1),
                          borderColor: '#51abff',
                          paddingHorizontal: scaleSize(5),
                          paddingVertical: scaleSize(1),
                          marginLeft: scaleSize(5),
                        }}
                      >
                        置顶
                      </Text>
                    )}
                  </View>
                  <Text style={{color: '#848fac', fontSize: setSpText2(12)}}>{this.formatTime(item.create_time)}</Text>
                </View>
                <View>
                  <Text style={{color: '#272a32', fontSize: setSpText2(14), lineHeight: setSpText2(21)}}>
                    {item.content.substring(0, 100)}...
                  </Text>
                  <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row'}}>
                    {item.images.map((image, index) => (
                      <Image
                        key={index}
                        style={{width: scaleSize(80), height: scaleSize(80), margin: scaleSize(5)}}
                        source={{uri: `${image}/thumb_medium`}} />
                    ))}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </SafeAreaView>
    );
  }

  private fetchData = () => {
    this.setState({page: 1}, () => {
      getBulletinList({page: this.state.page, count: this.state.limit})
        .then((res) => {
          this.setState({
            bulletinList: res.list,
            count: res.count,
            refreshing: false,
          });
        });
    });
  }

  private onEndReached = () => {
    if (this.state.page >= this.state.count / this.state.limit) { return; }
    this.setState({page: this.state.page + 1}, () => {
      getBulletinList({page: this.state.page, count: this.state.limit})
        .then((res) => {
          this.setState({
            bulletinList: this.state.bulletinList.concat(res.list),
            count: res.count,
          });
        });
    });
  }

  private formatTime = (val) => {
    const time = new Date(parseInt(val, 10) * 1000);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const mm = m < 10 ? '0' + m : m;
    const dd = d < 10 ? '0' + d : d;
    return y + '-' + mm + '-' + dd;
  }
}
