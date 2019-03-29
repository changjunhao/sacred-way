import React, { Component } from 'react';
import { TextInput } from 'react-native';
import {scaleSize} from '../../Lib/ScreenUtil';

interface InterfaceProps {
  placeholder: string;
  keyboardType?;
  secureTextEntry?: boolean;
  textContentType: 'username' | 'password' | 'newPassword';
  onChangeText: (val: any) => void;
}

interface InterfaceStates {
  borderBottomColor: string;
}

class LoginInput extends Component<InterfaceProps, InterfaceStates> {
  constructor(props) {
    super(props);
    this.state = {
      borderBottomColor: '#E2E2E2',
    };
  }

  public render(): React.ReactNode {
    const { borderBottomColor } = this.state;
    const { placeholder, keyboardType, secureTextEntry, textContentType } = this.props;
    return <TextInput
      style={{ width: scaleSize(300), height: 55, borderBottomColor, borderBottomWidth: 1}}
      keyboardType={keyboardType || 'default'}
      placeholder={placeholder}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry || false}
      onChangeText={(text) => this.props.onChangeText(text)}
      onFocus={() => this.setState({borderBottomColor: '#272A32'})}
      onBlur={() => this.setState({borderBottomColor: '#E2E2E2'})}
    />;
  }
}

export default LoginInput;
