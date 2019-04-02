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
  specialColumnListView: {
    marginBottom: scaleSize(12),
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
});
