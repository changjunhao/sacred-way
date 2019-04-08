import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

export default StyleSheet.create({
  listView: {
    paddingHorizontal: scaleSize(16),
  },
  header: {
    padding: scaleSize(16),
  },
  headerText: {
    color: '#222222',
    fontSize: setSpText2(16),
    fontWeight: 'bold',
  },
  countStyle: {
    color: '#EF3B3B',
  },
  itemHr: {
    backgroundColor: '#E2E2E2',
    height: scaleSize(1),
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(16),
  },
  avatar: {
    width: scaleSize(40),
    height: scaleSize(40),
    borderRadius: scaleSize(20),
    marginRight: scaleSize(12),
  },
  name: {
    fontSize: setSpText2(13),
    fontWeight: 'bold',
    color: '#222222',
  },
  realName: {
    fontWeight: '400',
    color: '#666666',
  },
  info: {
    fontSize: setSpText2(11),
    color: '#666666',
  },
  earningMoney: {
    color: '#F26522',
    fontSize: setSpText2(16),
    fontWeight: 'bold',
  },
});
