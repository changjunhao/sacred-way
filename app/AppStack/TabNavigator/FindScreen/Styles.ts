import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';

export default StyleSheet.create({
  bulletinView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(12),
  },
  bulletinTitle: {
    color: '#EF3B3B',
    fontSize: setSpText2(11),
    borderWidth: 1,
    borderColor: '#EF3B3B',
    paddingHorizontal: scaleSize(5),
    paddingVertical: scaleSize(2),
    marginRight: scaleSize(6),
  },
  specialColumnView: {
    paddingVertical: scaleSize(12),
  },
  specialColumnCover: {
    marginBottom: scaleSize(12),
    width: scaleSize(353),
    height: scaleSize(172),
  },
  specialColumnInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#e2dcdc',
    borderBottomWidth: scaleSize(1),
    paddingVertical: scaleSize(16),
  },
  specialColumnInfoText: {
    fontSize: setSpText2(12),
    color: '#999999',
  },
  subscribeButton: {
    width: scaleSize(125),
    height: scaleSize(35),
    borderRadius: scaleSize(18),
    backgroundColor: '#F26522',
    justifyContent: 'center',
  },
  subscribeButtonText: {
    textAlign: 'center',
    color: '#FFF',
  },
  subscribeButtonTip: {
    fontSize: setSpText2(10),
  },
  subscribeButtonPrice: {
    fontSize: setSpText2(15),
  },
  subscribeButtonUnit: {
    fontSize: setSpText2(12),
  },
  curriculumColumn: {
    width: scaleSize(295),
  },
  catalogTitle: {
    fontSize: setSpText2(13),
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: scaleSize(12),
  },
  courseView: {
    marginBottom: scaleSize(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyWordView: {
    borderColor: '#F26522',
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(7),
    width: scaleSize(50),
    height: scaleSize(20),
    marginRight: scaleSize(10),
    justifyContent: 'center',
  },
  keyWord: {
    textAlign: 'center',
    color: '#F26522',
    fontWeight: 'bold',
    fontSize: setSpText2(9),
  },
  courseTitle: {
    width: scaleSize(200),
    height: scaleSize(40),
    lineHeight: setSpText2(13 * 1.3),
    fontSize: setSpText2(13),
    color: '#222222',
    flexWrap: 'wrap',
  },
  coursePrice: {
    color: '#F26522',
    fontSize: setSpText2(12),
  },
  courseLearnNumber: {
    marginLeft: scaleSize(6),
    fontSize: setSpText2(12),
    color: '#999999',
  },
});
