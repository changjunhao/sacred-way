import React, { Component, Fragment } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';

// interface InterfaceProps {
//   name: string;
//   phone: string;
//   location: string;
// }

interface InterfaceStates {
  name: string;
  phone: string;
  location: string;
}

class EditInfo extends Component<{}, InterfaceStates> {

  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return (
      <Fragment>
        <View>
          <Text>姓名</Text>
          <TextInput placeholder={'请输入姓名（6个字）'} />
        </View>
        <View>
          <Text>联系电话</Text>
          <TextInput placeholder={'请输入姓名（6个字）'} />
        </View>
        <View>
          <Text>所在地</Text>
          <TextInput placeholder={'请输入姓名（6个字）'} />
        </View>
      </Fragment>
    );
  }
}

export default EditInfo;
