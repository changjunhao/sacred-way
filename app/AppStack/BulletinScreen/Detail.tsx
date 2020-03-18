import React, {Component} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Hyperlink from 'react-native-hyperlink';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getBulletin} from '../../Services/bulletin';
import ApplicationStyles from '../../Theme/ApplicationStyles';

interface InterfaceState {
  id: string;
  bulletin: any;
  imageModalVisible: boolean;
  currentImage: any;
  images: any[];
}

type StackParamList = {
  BulletinDetailScreen: {id: string};
};

type ScreenRouteProp = RouteProp<StackParamList, 'BulletinDetailScreen'>;

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

export default class BulletinDetailScreen extends Component<
  InterfaceProps,
  InterfaceState
> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      id: '',
      bulletin: {
        images: [],
      },
      imageModalVisible: false,
      currentImage: {},
      images: [],
    };
  }
  public componentDidMount() {
    getBulletin({id: this.props.route.params.id}).then(async bulletin => {
      this.setState({
        id: this.props.route.params.id,
        bulletin,
        images: bulletin.images,
      });
      const infoPromiseArray = bulletin.images.map((item: any) =>
        this.getInfo(item),
      );
      const infos: any[] = await Promise.all(infoPromiseArray);
      this.setState({
        images: infos,
      });
    });
  }

  public getInfo(originInfo: any) {
    return new Promise(resolve => {
      Image.getSize(
        originInfo.url,
        (width, height) => {
          resolve({...originInfo, width, height});
        },
        () => {
          resolve({...originInfo, width: 0, height: 0});
        },
      );
    });
  }

  public render() {
    const {bulletin, imageModalVisible, currentImage, images} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...ApplicationStyles.mainContainer}}>
          <View style={{marginTop: scaleSize(15)}}>
            <Text
              style={{
                color: '#272a32',
                fontWeight: 'bold',
                fontSize: setSpText2(15),
              }}>
              {bulletin.title}
            </Text>
          </View>
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
                {bulletin.category_name}
              </Text>
              {bulletin.is_top === 1 && (
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
              )}
            </View>
            <Text style={{color: '#848fac', fontSize: setSpText2(12)}}>
              {this.formatTime(bulletin.create_time)}
            </Text>
          </View>
          <View>
            <Hyperlink linkDefault={true} linkStyle={{color: '#2980b9'}}>
              <Text
                style={{
                  color: '#272a32',
                  fontSize: setSpText2(14),
                  lineHeight: setSpText2(21),
                }}>
                {bulletin.content}
              </Text>
            </Hyperlink>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {bulletin.images.map(
                (image: {id: string | number | undefined; url: any}) => (
                  <TouchableWithoutFeedback
                    key={image.id}
                    onPress={() =>
                      this.setState({
                        imageModalVisible: true,
                        currentImage: images.find(img => img.id === image.id),
                      })
                    }>
                    <Image
                      style={{
                        width: scaleSize(80),
                        height: scaleSize(80),
                        margin: scaleSize(5),
                      }}
                      source={{uri: `${image.url}/thumb_medium`}}
                    />
                  </TouchableWithoutFeedback>
                ),
              )}
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          visible={imageModalVisible}
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
              onPress={() => this.setState({imageModalVisible: false})}>
              <Image
                style={{
                  width: scaleSize(375),
                  height: scaleSize(
                    (currentImage.height * 375) / currentImage.width,
                  ),
                }}
                source={{uri: currentImage.url}}
              />
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }

  private formatTime = (val: string) => {
    const time = new Date(parseInt(val, 10) * 1000);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const mm = m < 10 ? '0' + m : m;
    const dd = d < 10 ? '0' + d : d;
    return y + '-' + mm + '-' + dd;
  };
}
