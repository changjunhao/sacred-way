import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../../Lib/ScreenUtil';

export default StyleSheet.create({
  bulletinView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleSize(10),
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
});
