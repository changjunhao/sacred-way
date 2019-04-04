import {Dimensions, StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

export default StyleSheet.create({
  cover: {
    width: scaleSize(375),
    height: scaleSize(205),
  },
  baseInfoView: {
    paddingTop: scaleSize(15),
    paddingHorizontal: scaleSize(16),
  },
  tipView: {
    width: scaleSize(30),
    height: scaleSize(16),
    marginRight: scaleSize(5),
    borderRadius: scaleSize(2),
    backgroundColor: '#F26522',
  },
  tip: {
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: scaleSize(16),
    fontSize: setSpText2(12),
  },
  title: {
    color: '#555555',
    fontSize: setSpText2(18),
  },
  headerDesc: {
    paddingVertical: scaleSize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summary: {
    width: scaleSize(252),
    color: '#999999',
    fontSize: setSpText2(12),
    flexWrap: 'wrap',
  },
  tabView: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226,226,226,0.9)',
  },
  tabButton: {
    height: 50,
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
  activeButtonText: {
    color: '#222',
    fontSize: setSpText2(16),
  },
  inactiveButtonText: {
    color: '#888',
    fontSize: setSpText2(14),
  },
  infoView: {
    paddingHorizontal: scaleSize(16),
    minHeight: Dimensions.get('window').height - scaleSize(100) - 88 - 34,
  },
});
