import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {scaleSize} from '../../Lib/ScreenUtil';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  course;
}

export default class CourseList extends Component<InterfaceProps> {
  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    const { course } = this.props;

    return (
      <TouchableWithoutFeedback>
        <View style={{...styles.courseView}}>
          {course.pic && (
            <View style={styles.coverView}>
              <Image style={styles.cover} resizeMode={'cover'} source={{uri: `${course.pic}/thumb_medium`}} />
              <Text style={styles.learningNumber}>{course.buy_count}人学过</Text>
            </View>
          )}
          <View style={course.pic ? {...styles.infoView, width: scaleSize(229)} : {...styles.infoView, width: '1000%'}}>
            <Text
              numberOfLines={2}
              style={styles.title}>
              {course.name}
            </Text>
            <View style={{...ApplicationStyles.flexRow}}>
              <Text style={{...styles.price, alignContent: 'space-between'}}>
                ¥{course.present_price / 100}元/<Text style={styles.unit}>单节</Text>
              </Text>
              <View style={{...ApplicationStyles.flexRow, alignContent: 'space-between'}}>
                <TouchableWithoutFeedback>
                  <Image source={require('../../Images/share_icon.png')} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View style={ApplicationStyles.flexRow}>
                    <Image source={require('../../Images/learn_icon.png')} />
                    <Text>学习</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
