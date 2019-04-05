import React, {Component} from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import CommunityListComponent from '../../Components/CommunityList';
import {getCommunityList} from '../../Services/community';
import ApplicationStyles from '../../Theme/ApplicationStyles';

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
      <ScrollView style={{...ApplicationStyles.mainContainer}}>
        <View style={{...ApplicationStyles.container}}>
          {questionsList.map((question) => (
            <CommunityListComponent key={question.id} question={question} navigation={this.props.navigation}/>
          ))}
        </View>
      </ScrollView>
    );
  }
}
