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
    width: scaleSize(110),
    height: scaleSize(55),
  },
  learningNumber: {
    paddingVertical: scaleSize(3),
    backgroundColor: '#EFEFEF',
    textAlign: 'center',
    color: '#555555',
    fontSize: setSpText2(12),
  },
  infoView: {
    height: scaleSize(78),
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
  recommendPrice: {
    color: '#FF5400',
    fontSize: setSpText2(14),
    fontWeight: 'bold',
  },
  unit: {
    fontSize: setSpText2(12),
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shareIcon: {
    marginRight: scaleSize(28),
  },
  learningText: {
    marginLeft: scaleSize(8),
    fontSize: setSpText2(12),
    color: '#F26522',
  },
  shareText: {
    color: '#644528',
    fontSize: setSpText2(12),
    fontWeight: 'bold',
  },
  sharePriceText: {
    fontSize: setSpText2(14),
  },
  specialColumnCoverLabel: {
    backgroundColor: '#F26522',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleSize(8),
    width: scaleSize(30),
    height: scaleSize(16),
  },
  specialColumnCoverLabelText: {
    fontSize: setSpText2(12),
    fontWeight: 'bold',
    color: '#FFFEFE',
  },
});
