import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../../Lib/ScreenUtil';

export default StyleSheet.create({
  labelView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    color: '#272A32',
    fontSize: setSpText2(15),
    marginLeft: scaleSize(2),
  },
  input: {
    marginVertical: scaleSize(12),
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(16),
    borderColor: '#E2E2E2',
    borderWidth: 1,
    fontSize: setSpText2(14),
    color: '#000',
  },
});
