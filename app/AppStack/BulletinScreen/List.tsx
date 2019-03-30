import React, {Component} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import { scaleSize, setSpText2 } from '../../Lib/ScreenUtil';
import { getBulletinList } from '../../Services/bulletin';

interface InterfaceState {
  bulletinList: any[];
  refreshing: boolean;
  page: number;
  limit: number;
  count: number;
}

interface InterfaceProps extends NavigationScreenProps<{}> {}

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
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text>{item.category_name}</Text>
                  </View>
                  {item.is_top === 1 && <View><Text>置顶</Text></View>}
                </View>
                <View>
                  <Text>{item.content.substring(0, 100)}...</Text>
                  <View style={{flexDirection: 'row'}}>
                    {item.images.map((image, index) => (
                      <Image
                        key={index}
                        style={{width: scaleSize(80), height: scaleSize(80)}}
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
}
