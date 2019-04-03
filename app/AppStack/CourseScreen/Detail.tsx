import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';

interface InterfaceProps extends NavigationScreenProps<{}> {}

export default class CourseDetail extends Component<InterfaceProps> {

  public componentDidMount(): void {
    console.log(this.props.navigation.state.params);
  }

  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            <Text>课程详情页</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
