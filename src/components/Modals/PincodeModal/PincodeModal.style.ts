import styled from 'styled-components/native';

import { theme } from '@@style/theme';
import { fontSize, width, height } from '@@utils/ui';

//TODO: 테마스토어 적용
const themeColor = theme.light;

export const PincodeModalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const NumberButton = styled.View`
  border-color: ${({ theme }) => theme.color.grey200Grey800};
  border-radius: ${width * 36}px;
  border-width: ${width * 1}px;
  border-style: solid;
  width: ${width * 72}px;
  height: ${height * 72}px;
  justify-content: center;
  align-items: center;
`;

export const DeleteButton = styled.View`
  border-color: ${({ theme }) => theme.color.grey200Grey800};
  border-radius: ${width * 36}px;
  border-width: ${width * 1}px;
  border-style: solid;
  width: ${width * 72}px;
  height: ${height * 72}px;
  justify-content: center;
  align-items: center;
`;

//TODO: 스타일보기위한 주석임 완성될때까지 둘것
export const PincodeModalStyle = {
  colorCircleButtons: themeColor.color.whiteBlack,
  numbersButtonOverlayColor: themeColor.color.grey100Grey800,
  colorPassword: themeColor.color.primary,
  colorPasswordEmpty: themeColor.color.grey200Grey800,
  stylePinCodeButtonCircle: {
    borderColor: themeColor.color.grey200Grey800,
    borderWidth: width * 1,
    width: width * 72,
    height: height * 72,
    borderRadius: width * 36,
  },
  stylePinCodeButtonNumber: themeColor.color.blackWhite,
  stylePinCodeButtonNumberPressed: themeColor.color.blackWhite,
  stylePinCodeCircle: {
    width: width * 12,
    height: height * 12,
    borderRadius: width * 6,
    marginLeft: width * 4,
    marginRight: width * 4,
    opacity: 1,
  },
  stylePinCodeColorTitle: themeColor.color.blackWhite,
  stylePinCodeTextButtonCircle: { fontFamily: themeColor.fmExBold, fontSize: fontSize(32) },
  stylePinCodeTextTitle: { fontFamily: themeColor.fmRegular, fontSize: fontSize(18), lineHeight: fontSize(24) },
  stylePinCodeViewTitle: {
    // backgroundColor: 'yellow',
    flex: 0.7,
  },
  stylePinCodeRowButtons: {
    // backgroundColor: 'red',
    justifyContent: 'space-between' as const,
    width: width * 295,
    height: height * 72 + height * 24,
    padding: 0,
    margin: 0,
  },
  stylePinCodeColumnButtons: {
    // backgroundColor: 'blue',
    width: width * 72,
    height: height * 72 + height * 24,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: height * 22,
  },
  styleMainContainer: {
    flex: 1,
    justifyContent: 'flex-start' as const,
    // backgroundColor: 'green',
    paddingTop: height * 213,
    paddingLeft: width * 40,
    paddingRight: width * 40,
    paddingBottom: height * 72,
    margin: 0,
  },
  stylePinCodeMainContainer: {
    // backgroundColor: 'black',
  },
  stylePinCodeEnterContainer: {
    alignItems: 'flex-start' as const,
  },
  stylePinCodeChooseContainer: {
    alignItems: 'flex-start' as const,
  },
  stylePinCodeHiddenPasswordCircle: {
    // backgroundColor: 'grey',
    alignItems: 'flex-start' as const,
    flex: 1,
  },
  stylePinCodeColorTitleError: themeColor.color.red,
  stylePinCodeColorSubtitleError: themeColor.color.whiteBlack,
  stylePinCodeColorSubtitle: themeColor.color.whiteBlack,
  stylePinCodeDeleteButtonText: {
    marginTop: 0,
  },
  stylePinCodeEmptyColumn: {
    width: width * 72,
    height: height * 72 + height * 24,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: height * 22,
  },
  stylePinCodeDeleteButtonColorShowUnderlay: themeColor.color.grey100Grey800,
};
