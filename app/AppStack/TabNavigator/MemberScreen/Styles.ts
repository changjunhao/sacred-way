import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';

export default StyleSheet.create({
  memberCardBg: {
    width: scaleSize(375),
    height: scaleSize(154),
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scaleSize(24),
    paddingHorizontal: scaleSize(16),
  },
  avatar: {
    width: scaleSize(50),
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    borderColor: 'rgb(254, 227, 166)',
    borderWidth: 2,
    marginRight: scaleSize(18),
  },
  userName: {
    color: '#FEE3A6',
    fontSize: setSpText2(16),
  },
  mainContainer: {
    marginTop: scaleSize(-56),
    paddingHorizontal: scaleSize(16),
  },
  assetsInfoCard: {
    width: scaleSize(343),
    height: scaleSize(240),
    borderRadius: scaleSize(6),
    backgroundColor: '#FFF',
    shadowColor: 'rgb(85, 85, 85)',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: scaleSize(16),
    marginBottom: scaleSize(36),
  },
  recommendation: {

  },
});
