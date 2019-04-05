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
  incomeView: {
    flexDirection: 'row',
  },
  myIncome: {
    flex: 1,
    height: scaleSize(88),
  },
  canWithdraw: {
    borderLeftColor: '#EBEBEB',
    borderLeftWidth: scaleSize(1),
    width: scaleSize(120),
    height: scaleSize(88),
    justifyContent: 'center',
  },
  myUsers: {
    marginTop: scaleSize(16),
    paddingVertical: scaleSize(16),
    borderTopColor: '#EBEBEB',
    borderTopWidth: scaleSize(1),
  },
  myUsersInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: scaleSize(60),
  },
  incomeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: scaleSize(60),
  },
  infoTitle: {
    fontSize: setSpText2(22),
    fontWeight: 'bold',
    color: '#49495E',
  },
  infoTitleIcon: {
    marginLeft: scaleSize(8),
  },
  infoTipText: {
    marginTop: scaleSize(5),
    fontSize: setSpText2(12),
    fontWeight: '500',
    textAlign: 'center',
    color: '#AAAAAA',
  },
  text: {
    color: '#49495E',
    fontWeight: '500',
    textAlign: 'center',
  },
  userNumber: {
    fontSize: setSpText2(20),
  },
  todayIncome: {
    fontSize: setSpText2(22),
  },
  totalIncome: {
    fontSize: setSpText2(14),
  },
  money: {
    color: '#E8C38D',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: setSpText2(20),
  },
  recommendTitle: {
    color: '#444444',
    fontSize: setSpText2(22),
    fontWeight: 'bold',
  },
  recommendTitleBorder: {
    width: scaleSize(3),
    height: scaleSize(16),
    marginRight: scaleSize(8),
  },
});
