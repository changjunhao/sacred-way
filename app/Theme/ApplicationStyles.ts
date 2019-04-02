import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../Lib/ScreenUtil';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: scaleSize(16),
    paddingTop: scaleSize(15),
  },
  hr: {
    width: scaleSize(375),
    height: scaleSize(5),
    backgroundColor: '#E2E2E2',
    marginLeft: scaleSize(-16),
  },
  contentListHeader: {
    height: scaleSize(62),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentListTitle: {
    fontSize: setSpText2(18),
    color: '#272a32',
    fontWeight: 'bold',
  },
});
