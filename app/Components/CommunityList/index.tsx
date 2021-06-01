import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

interface InterfaceProps {
  question: Record<string, any>;
}

const CommunityList: React.FC<InterfaceProps> = props => {
  const navigation = useNavigation();
  const {question} = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('CommunityDetail', {id: question.id});
      }}>
      <View style={styles.questionItem}>
        {question.category_pic ? (
          <Image
            style={styles.questionsListHeadImg}
            source={{uri: question.category_pic}}
          />
        ) : null}
        <View>
          <Text
            numberOfLines={2}
            style={{
              width: scaleSize(267),
              flexWrap: 'wrap',
              fontWeight: '600',
              color: '#212121',
              fontSize: setSpText2(16),
              lineHeight: setSpText2(20),
            }}>
            {question.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginTop: scaleSize(6),
              marginBottom: scaleSize(8),
            }}>
            <Text
              style={{
                color: '#555',
                fontSize: setSpText2(12),
                marginRight: scaleSize(12),
              }}>
              共{question.dialogue_count}对话
            </Text>
            <Text
              style={{
                color: '#555',
                fontSize: setSpText2(12),
              }}>
              来自：{question.group_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  questionItem: {
    marginBottom: scaleSize(14),
    flexDirection: 'row',
  },
  questionsListHeadImg: {
    width: scaleSize(60),
    height: scaleSize(40),
    borderRadius: scaleSize(4),
    marginRight: scaleSize(16),
  },
});

export default CommunityList;
