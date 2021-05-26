import {StyleSheet} from 'react-native';
import {colors, screenStyles} from '../../constants';

export default StyleSheet.create({
  ...screenStyles,
  logo: {
    height: 24,
    width: 142,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: colors.transparent,
    padding: 7.5,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: colors.white,
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.black,
  },
  modalStyle: {
    margin: 0,
  },
  modalContentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  homeScreenHeader: {
    backgroundColor: colors.transparent,
  },
  selectedBoxStyle: {
    height: 100,
    width: 80,
    marginHorizontal: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.itemColor,
  },
  normalBoxStyle: {
    height: 100,
    width: 80,
    marginHorizontal: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  popularBoxStyle: {
    height: 140,
    width: 100,
    marginHorizontal: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.itemColor,
  },
});
