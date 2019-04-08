import {Dimensions, StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

export default StyleSheet.create({
  cover: {
    width: scaleSize(375),
    height: scaleSize(187.5),
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
    width: scaleSize(195),
    color: '#999999',
    fontSize: setSpText2(12),
    flexWrap: 'wrap',
  },
  courseSummary: {
    width: scaleSize(252),
  },
  headerDescNumber: {
    color: '#272a32',
    fontWeight: 'bold',
    fontSize: setSpText2(16),
  },
  headerDescUnit: {
    fontSize: setSpText2(12),
  },
  headerDescTip: {
    color: '#999999',
    fontSize: setSpText2(12),
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
    paddingTop: scaleSize(16),
    minHeight: Dimensions.get('window').height - scaleSize(100) - 88 - 34,
  },
  descriptionContentView: {
    paddingBottom: scaleSize(7),
  },
  descriptionTitle: {
    color: '#272A32',
    fontSize: setSpText2(17),
    fontWeight: '600',
    lineHeight: setSpText2(24),
  },
  descriptionText:  {
    color: '#666',
    fontSize: setSpText2(15),
    lineHeight: setSpText2(22.5),
  },
});
