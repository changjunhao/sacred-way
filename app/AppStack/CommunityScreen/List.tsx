import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import CommunityListComponent from '../../Components/CommunityList';
import {getCommunityList} from '../../Services/community';
import ApplicationStyles from '../../Theme/ApplicationStyles';

const CommunityListScreen: React.FC = () => {
  const [questionsList, setQuestionsList] = useState<never[]>([]);

  useEffect(() => {
    getCommunityList({type: 3}).then(res => {
      setQuestionsList(res.list);
    });
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...ApplicationStyles.mainContainer,
      }}>
      <View
        style={{
          ...ApplicationStyles.container,
        }}>
        {questionsList.map((question: {id: string | number | undefined}) => (
          <CommunityListComponent key={question.id} question={question} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CommunityListScreen;
