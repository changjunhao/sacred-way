import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationScreenProps} from 'react-navigation';
import {scaleSize} from '../../Lib/ScreenUtil';
import ApplicationStyles from '../../Theme/ApplicationStyles';
import styles from './Styles';

interface InterfaceProps extends NavigationScreenProps<{}> {
  course;
  borderBottom: boolean;
  recommend: boolean;
}

export default class CourseList extends Component<InterfaceProps> {
  public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
    const { course, borderBottom, recommend } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={
          () => this.props.navigation.navigate(
            'CourseDetail',
            {id: course.curriculum_id, columnId: course.column_id},
          )
        }>
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
              {recommend ? null : <Text style={styles.learningNumber}>{course.buy_count}人学过</Text>}
            </View>
          ) : null}
          <View
            style={course.pic ?
              {...styles.infoView, width: scaleSize(229)} :
              {...styles.infoView, width: scaleSize(343)}}>
            <Text
              numberOfLines={2}
              style={styles.title}>
              {course.name}
            </Text>
            <View style={{...ApplicationStyles.flexRow, justifyContent: 'space-between'}}>
              {recommend ? (
                <Text style={{...styles.recommendPrice}}>
                  ¥{course.present_price / 100}元
                </Text>
              ) : (
                <Text style={{...styles.price}}>
                  ¥{course.present_price / 100}元/<Text style={styles.unit}>单节</Text>
                </Text>
              )}
              {recommend ? (
                <TouchableWithoutFeedback>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                      width: scaleSize(141),
                      height: scaleSize(30),
                      borderRadius: scaleSize(15),
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    colors={['#F4E2C1', '#F2D499']}>
                    <Text style={styles.shareText}>
                      分享赚
                      <Text style={styles.sharePriceText}>
                        ¥{(course.direct_price / 100).toFixed(2)}
                      </Text>
                      元
                    </Text>
                    <Image source={require('./images/share_icon.png')} />
                  </LinearGradient>
                </TouchableWithoutFeedback>
              ) : (
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
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
