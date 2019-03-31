import React, { Component, Fragment } from 'react';
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {scaleSize} from '../../Lib/ScreenUtil';
import district from './district';
import styles from './Styles';

interface InterfaceProps {
  UserStore;
}

class EditInfo extends Component<InterfaceProps> {

  public componentDidMount(): void {
    this.props.UserStore.setBaseInfo({
      name: this.props.UserStore.info.real_name,
      phone: this.props.UserStore.info.contact_number || this.props.UserStore.info.mobile_number,
      location: this.props.UserStore.info.location,
    });
  }

  public componentWillUnmount(): void {
    Picker.hide();
  }

  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    return (
      <Fragment>
        <View>
          <View style={styles.labelView}>
            <Icon size={scaleSize(8)} color='#FF3F3F' name={'ios-star'}/>
            <Text style={styles.labelText}>姓名</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={'请输入姓名（6个字）'}
            defaultValue={this.props.UserStore.baseInfo.name}
            onChangeText={(value) => this.handleNameChange(value)}
          />
        </View>
        <View>
          <View style={styles.labelView}>
            <Icon size={scaleSize(8)} color='#FF3F3F' name={'ios-star'}/>
            <Text style={styles.labelText}>联系电话</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={'请输入联系电话'}
            defaultValue={this.props.UserStore.baseInfo.phone}
            onChangeText={(value) => this.handlePhoneChange(value)}
          />
        </View>
        <View>
          <View style={styles.labelView}>
            <Icon size={scaleSize(8)} color='#FF3F3F' name={'ios-star'}/>
            <Text style={styles.labelText}>所在地</Text>
          </View>
          <TouchableHighlight underlayColor='white' onPress={this.handlePickerShow}>
            <Text style={styles.input}>{this.props.UserStore.baseInfo.location}</Text>
          </TouchableHighlight>
        </View>
      </Fragment>
    );
  }

  private handlePhoneChange = (phone) => {
    this.props.UserStore.setBaseInfo({phone});
  }

  private handleNameChange = (name) => {
    this.props.UserStore.setBaseInfo({name});
  }

  private handlePickerShow = () => {
    Picker.init({
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择省市区/县',
      pickerConfirmBtnColor: [47, 134, 246, 1],
      pickerCancelBtnColor: [102, 111, 131, 1],
      pickerTitleColor: [17, 26, 52, 1],
      pickerToolBarBg: [249, 250, 251, 1],
      pickerBg: [255, 255, 255, 1],
      pickerRowHeight: 45,
      pickerData: district,
      selectedValue: [59],
      onPickerConfirm: (data) => {
        let location = data[0];
        if (data[1]) {
          location += `-${data[1]}`;
          if (data[2]) {
            location += `-${data[2]}`;
          }
        }
        this.props.UserStore.setBaseInfo({location});
      },
    });
    Picker.show();
  }

}

export default EditInfo;
