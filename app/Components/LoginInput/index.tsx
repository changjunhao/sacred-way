import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {scaleSize} from '../../Lib/ScreenUtil';

type InterfaceProps = {
  placeholder: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  textContentType: 'username' | 'password' | 'newPassword';
  onChangeText: (val: any) => void;
};

const LoginInput: React.FC<InterfaceProps> = props => {
  const {
    placeholder,
    keyboardType,
    secureTextEntry,
    textContentType,
    onChangeText,
  } = props;
  const [borderBottomColor, setBorderBottomColor] = useState('#E2E2E2');

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
      onChangeText={text => onChangeText(text)}
      onFocus={() => setBorderBottomColor('#272A32')}
      onBlur={() => setBorderBottomColor('#E2E2E2')}
    />
  );
};

export default LoginInput;
