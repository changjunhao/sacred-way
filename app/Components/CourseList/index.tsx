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
  borderBottom: boolean | undefined;
}

export default class CourseList extends Component<InterfaceProps> {
  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    const { course, borderBottom } = this.props;

    return (
      <TouchableWithoutFeedback>
        <View style={ borderBottom ?
          {
            ...styles.courseView,
            borderBottomWidth: scaleSize(1),
            borderBottomColor: '#EBEBEB',
          } : {...styles.courseView}}
        >
          {course.pic ? (
            <View style={styles.coverView}>
              <Image style={styles.cover} resizeMode={'cover'} source={{uri: `${course.pic}/thumb_medium`}} />
              <Text style={styles.learningNumber}>{course.buy_count}人学过</Text>
            </View>
          ) : null}
          <View style={course.pic ? {...styles.infoView, width: scaleSize(229)} : {...styles.infoView, width: '1000%'}}>
            <Text
              numberOfLines={2}
              style={styles.title}>
              {course.name}
            </Text>
            <View style={{...ApplicationStyles.flexRow, justifyContent: 'space-between'}}>
              <Text style={{...styles.price}}>
                ¥{course.present_price / 100}元/<Text style={styles.unit}>单节</Text>
              </Text>
              <View style={{...ApplicationStyles.flexRow}}>
                <TouchableWithoutFeedback>
                  <Image style={styles.shareIcon} source={require('../../Images/share_icon.png')} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={
                  () => this.props.navigation.navigate(
                    'CourseDetail',
                    {id: course.curriculum_id, columnId: course.column_id},
                  )
                }>
                  <View style={ApplicationStyles.flexRow}>
                    <Image source={require('../../Images/learn_icon.png')} />
                    <Text style={styles.learningText}>学习</Text>
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
