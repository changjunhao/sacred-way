import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

export default StyleSheet.create({
  courseView: {
    paddingVertical: scaleSize(20),
    flexDirection: 'row',
  },
  coverView: {
    marginRight: scaleSize(12),
  },
  cover: {
    width: scaleSize(102),
    height: scaleSize(67),
  },
  learningNumber: {
    paddingVertical: scaleSize(3),
    backgroundColor: '#EFEFEF',
    textAlign: 'center',
    color: '#555555',
    fontSize: setSpText2(12),
  },
  infoView: {
    height: scaleSize(90),
    justifyContent: 'space-between',
  },
  title: {
    flexWrap: 'wrap',
    fontSize: setSpText2(14),
    fontWeight: '500',
    color: '#555555',
  },
  price: {
    color: '#999999',
    fontSize: setSpText2(16),
    fontWeight: 'bold',
  },
  unit: {
    fontSize: setSpText2(12),
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
