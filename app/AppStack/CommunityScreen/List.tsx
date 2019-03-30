import React, {Component} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';
import {getCommunityList} from '../../Services/community';

interface InterfaceState {
  questionsList;
}

interface InterfaceProps extends NavigationScreenProps<{}> {}

export default class CommunityListScreen extends Component<InterfaceProps, InterfaceState> {
  public static navigationOptions = {
    headerBackTitle: null,
    title: '美秒社群精华问答',
  };

  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
    };
  }

  public componentDidMount() {
    getCommunityList({type: 3})
      .then((res) => {
        this.setState({
          questionsList: res.list,
        });
      });
  }

  public render() {
    const { questionsList } = this.state;
    return (
      <ScrollView style={{paddingTop: scaleSize(16), paddingHorizontal: scaleSize(16)}}>
        {questionsList.map((question) => (
          <TouchableWithoutFeedback
            key={question.id}
            onPress={() => {this.props.navigation.navigate('CommunityDetail', {id: question.id}); }}>
            <View  style={styles.questionItem}>
              {question.category_pic ?
                <Image style={styles.questionsListHeadImg} source={{uri: question.category_pic}}/> :
                null}
              <View>
                <Text
                  numberOfLines={2}
                  style={{
                    width: scaleSize(267),
                    flexWrap: 'wrap',
                    fontWeight: '600',
                    color: '#212121',
                    fontSize: setSpText2(16),
                    lineHeight: setSpText2(20)}}
                >
                  {question.title}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    marginTop: scaleSize(6),
                    marginBottom: scaleSize(8)}}
                >
                  <Text
                    style={{
                      color: '#555',
                      fontSize: setSpText2(12),
                      marginRight: scaleSize(12)}}
                  >
                    共{question.dialogue_count}对话
                  </Text>
                  <Text style={{color: '#555', fontSize: setSpText2(12)}}>
                    来自：{question.group_name}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  questionItem: {
    marginBottom: scaleSize(14),
    flexDirection: 'row',
  },
  questionsListHeadImg: {
    width: scaleSize(60),
    height: scaleSize(40),
    borderRadius: scaleSize(4),
    marginRight: scaleSize(16),
  },
});
