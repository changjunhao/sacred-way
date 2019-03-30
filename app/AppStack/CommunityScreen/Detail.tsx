import React, {Component, Fragment} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import { getCommunityInfo } from '../../Services/community';

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

interface InterfaceState {
  title: string;
  groupName: string;
  readCount: number;
  list: any[];
  publishTime: string | number;
  screenshots: string;
  modalVisible: boolean;
}

interface InterFaceStateParams extends NavigationState {
  params: { id: string; };
}

interface InterfaceProps {
  navigation: NavigationScreenProp<InterFaceStateParams>;
}

export default class CommunityDetailScreen extends Component<InterfaceProps, InterfaceState> {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      groupName: '',
      readCount: 0,
      list: [],
      publishTime: '',
      screenshots: '',
      modalVisible: false,
    };
  }

  public componentDidMount() {
    const { id } = this.props.navigation.state.params;
    getCommunityInfo({id})
      .then(async (res) => {
        const infoPromiseArray = res.list
          .map((item) => this.getInfo(item));
        const infos: any[] = await Promise.all(infoPromiseArray);
        const userIds = [...new Set(infos.map((item) => item.nick_name))];
        this.setState({
          title: res.title,
          groupName: res.group_name,
          readCount: res.read_count,
          list: infos.map((item) => ({
            ...item,
            color: colorSet[userIds.indexOf(item.nick_name) % 10],
          })),
          publishTime: res.publish_time,
          screenshots: res.screenshots,
        });
      });
  }

  public getInfo(originInfo) {
    return new Promise((resolve) => {
      if (originInfo.type === 'IMAGE' && originInfo.content) {
        Image.getSize(originInfo.content, (width, height) => {
          resolve({...originInfo, width, height});
        }, () => {
          resolve({...originInfo, width: 0, height: 0});
        });
      } else {
        resolve({...originInfo, width: 0, height: 0});
      }
    });
  }

  public render() {
    const { title, groupName, readCount, list, modalVisible } = this.state;
    return (
      <Fragment>
        <ScrollView style={{backgroundColor: '#f0f0f0', padding: scaleSize(16)}}>
          <ImageBackground
            source={require('../../Images/watermark.png')}
            style={{minHeight: '100%', width: '100%'}}
            imageStyle={{resizeMode: 'repeat', opacity: 1}}>
            <Text
              style={{fontWeight: 'bold', color: '#222', fontSize: setSpText2(17), lineHeight: scaleSize(20)}}>
              {title}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontWeight: 'bold', color: '#555', fontSize: setSpText2(12)}}>
                共{list.length}对话 来自：{groupName}
              </Text>
              <Text>{readCount}次学习</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: scaleSize(42.5),
                marginBottom: scaleSize(25)}}
            >
              <View style={{backgroundColor: '#ded9d9', height: scaleSize(1), width: scaleSize(90)}} />
              <View>
                <Text style={{textAlign: 'center', color: '#a5a5a5', fontSize: setSpText2(12)}}>以下为群内对话摘录</Text>
              </View>
              <View style={{backgroundColor: '#ded9d9', height: scaleSize(1), width: scaleSize(90)}} />
            </View>
            {list.filter((item) => item.content).map((item) => (
              <View key={item.id} style={{flexDirection: 'row', marginBottom: scaleSize(14)}}>
                <LinearGradient colors={item.color.back} style={{width: scaleSize(40), height: scaleSize(40)}}>
                  <Text
                    style={{
                      lineHeight: scaleSize(40),
                      textAlign: 'center',
                      fontSize: setSpText2(18),
                      fontWeight: 'bold', color: item.color.font}}
                  >
                    {item.nick_name.trim().substr(0, 1)}
                  </Text>
                </LinearGradient>
                <View style={{paddingLeft: scaleSize(9)}}>
                  <Text style={{color: '#666', fontSize: setSpText2(12), marginBottom: scaleSize(4)}}>
                    {item.nick_name}
                    <Text>@{groupName}</Text>
                  </Text>
                  {item.type === 'IMAGE' ?
                    (
                      <Image
                        style={{
                          width: scaleSize(125),
                          height: scaleSize(item.height * 125 / item.width),
                          borderRadius: scaleSize(4)}}
                        source={{uri: item.content}}
                      />
                    ) :
                    (
                      <View
                        style={{
                          maxWidth: scaleSize(238),
                          backgroundColor: '#FFF',
                          paddingHorizontal: scaleSize(14),
                          paddingVertical: scaleSize(12)}}
                      >
                        <Text
                          selectable={true}
                          style={{
                            fontSize: setSpText2(17),
                            lineHeight: scaleSize(22)}}
                        >
                          {item.content.replace(/<br\/>/g, '\n')}
                        </Text>
                      </View>
                    )
                  }
                </View>
              </View>
            ))}
            <View style={{marginTop: scaleSize(30), marginBottom: scaleSize(44)}}>
              <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: true})}>
                <Text style={{textAlign: 'center', fontSize: setSpText2(12), fontWeight: 'bold', color: '#555'}}>
                  也想加入干货讨论？<Text style={{color: '#f26522'}}>点击这里</Text>
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </ImageBackground>
        </ScrollView>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(37,38,45,.7)'}}
          >
            <Image
              style={{width: scaleSize(250), height: scaleSize(250)}}
              source={require('../../Images/Wechat.jpeg')}
            />
            <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
              <Icon style={{marginTop: scaleSize(30)}} size={scaleSize(25)} color='#FFF' name={'close'}/>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </Modal>
      </Fragment>
    );
  }
}
