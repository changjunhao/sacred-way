import {StyleSheet} from 'react-native';
import {scaleSize, setSpText2} from '../Lib/ScreenUtil';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: scaleSize(75),
  },
  header: {
    width: scaleSize(300),
    marginBottom: scaleSize(30),
  },
  headerTitle: {
    fontSize: setSpText2(30),
    lineHeight: setSpText2(36),
    fontWeight: 'bold',
    color: '#272A32',
  },
  headerSubtitle: {
    fontSize: setSpText2(18),
    lineHeight: setSpText2(21.6),
    color: '#666',
  },
  button: {
    marginTop: scaleSize(30),
    width: scaleSize(298),
    height: scaleSize(45),
    alignItems: 'center',
    borderRadius: scaleSize(4),
  },
  buttonActive: {
    backgroundColor: '#272A32',
  },
  buttonDisable: {
    backgroundColor: '#bfc4d0',
  },
  buttonText: {
    color: 'white',
    lineHeight: scaleSize(45),
  },
  actionContainer: {
    width: scaleSize(300),
    marginTop: scaleSize(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    color: '#272a32',
    fontSize: setSpText2(14),
  },
  signUpInputView: {
    width: scaleSize(300),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  signUpInput: {
    flex: 1,
    color: '#111a34',
    fontSize: setSpText2(15),
  },
  signUpInputLabel: {
    fontSize: setSpText2(16),
    minWidth: scaleSize(50),
    marginRight: scaleSize(10),
    textAlign: 'right',
  },
  signInTipView: {
    marginTop: scaleSize(25),
  },
  signInTip: {
    color: '#f26522',
    fontSize: setSpText2(12),
  },
});
