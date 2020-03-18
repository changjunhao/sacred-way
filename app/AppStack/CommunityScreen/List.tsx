import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import CommunityListComponent from '../../Components/CommunityList';
import {getCommunityList} from '../../Services/community';
import ApplicationStyles from '../../Theme/ApplicationStyles';

interface InterfaceState {
  questionsList: any;
}

type ScreenNavigationProp = StackNavigationProp<any>;

interface InterfaceProps {
  navigation: ScreenNavigationProp;
}

export default class CommunityListScreen extends Component<
  InterfaceProps,
  InterfaceState
> {
  public static navigationOptions = {
    title: '美秒社群精华问答',
  };

  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      questionsList: [],
    };
  }

  public componentDidMount() {
    getCommunityList({type: 3}).then(res => {
      this.setState({
        questionsList: res.list,
      });
    });
  }

  public render() {
    const {questionsList} = this.state;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...ApplicationStyles.mainContainer}}>
        <View style={{...ApplicationStyles.container}}>
          {questionsList.map((question: {id: string | number | undefined}) => (
            <CommunityListComponent
              key={question.id}
              question={question}
              navigation={this.props.navigation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
