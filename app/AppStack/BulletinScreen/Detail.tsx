import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import { getBulletin } from '../../Services/bulletin';
import ApplicationStyles from '../../Theme/ApplicationStyles';

interface InterfaceState {
  id: string;
  bulletin;
}

interface InterFaceStateParams extends NavigationState {
  params: { id: string; };
}

interface InterfaceProps {
  navigation: NavigationScreenProp<InterFaceStateParams>;
}

export default class BulletinDetailScreen extends Component<InterfaceProps, InterfaceState> {
  public static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', navigation.state.params.title),
      headerBackTitle: null,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      bulletin: {
        images: [],
      },
    };
  }
  public componentWillMount() {
    getBulletin({ id: this.props.navigation.state.params.id })
      .then((bulletin) => {
        this.setState({
          id: this.props.navigation.state.params.id,
          bulletin,
        });
      });
  }

  public render() {
    const { bulletin } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...ApplicationStyles.mainContainer}}>
          <View style={{marginTop: scaleSize(15)}}>
            <Text style={{color: '#272a32', fontWeight: 'bold', fontSize: setSpText2(15)}}>{bulletin.title}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text>{bulletin.category_name}</Text>
            </View>
            {bulletin.is_top === 1 && <View><Text>置顶</Text></View>}
          </View>
          <View>
            <Text>{bulletin.content}</Text>
            <View style={{flexDirection: 'row'}}>
              {bulletin.images.map((image) => (
                <Image
                  key={image.id}
                  style={{width: scaleSize(80), height: scaleSize(80)}}
                  source={{uri: `${image.url}/thumb_medium`}} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
