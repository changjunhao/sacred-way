import React, {Component} from 'react';
import {TextInput} from 'react-native';
import {scaleSize} from '../../Lib/ScreenUtil';

interface InterfaceProps {
  placeholder: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  textContentType: 'username' | 'password' | 'newPassword';
  onChangeText: (val: any) => void;
}

interface InterfaceStates {
  borderBottomColor: string;
}

class LoginInput extends Component<InterfaceProps, InterfaceStates> {
  constructor(props: Readonly<InterfaceProps>) {
    super(props);
    this.state = {
      borderBottomColor: '#E2E2E2',
    };
  }

  public render() {
    const {borderBottomColor} = this.state;
    const {
      placeholder,
      keyboardType,
      secureTextEntry,
      textContentType,
    } = this.props;
    return (
      <TextInput
        style={{
          width: scaleSize(300),
          height: 55,
          borderBottomColor,
          borderBottomWidth: 1,
          color: '#000000',
        }}
        placeholderTextColor={'#8E8E8E'}
        keyboardType={keyboardType || 'default'}
        placeholder={placeholder}
        textContentType={textContentType}
        secureTextEntry={secureTextEntry || false}
        onChangeText={text => this.props.onChangeText(text)}
        onFocus={() => this.setState({borderBottomColor: '#272A32'})}
        onBlur={() => this.setState({borderBottomColor: '#E2E2E2'})}
      />
    );
  }
}

export default LoginInput;
