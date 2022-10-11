import Styled from 'styled-components/native';

//common
export const ModalTitle = Styled.Text`
${({ theme }) => theme.font.Title.sm};
fontFamily: ${({ theme }) => theme.fmBold};
lineHeight: 32px;
`;

export const ModalTopWrapper = Styled.View`
flexDirection: row;
justifyContent: space-between;
alignItems: flex-start;
height: 40px;
paddingTop: 8px;
`;

export const ButtonWrapper = Styled.View`
flexDirection: row;
justifyContent: space-between;
margin: 24px 0;
`;

export const ContentWrapper = Styled.View`
padding: 24px 0;
`;

export const Gap = Styled.View`
width: 16px;
`;

//bottomModal
export const BottomModalContainer = Styled.View`
borderTopLeftRadius: 24px;
borderTopRightRadius: 24px;
backgroundColor: ${({ theme }) => theme.color.whiteBlack};
color: ${({ theme }) => theme.color.blackWhite};
padding: 24px;
paddingBottom: 34px;
`;

export const BottomModalBackDrop = Styled.View`
flex: 1;
justifyContent: flex-end;
margin:0;
`;
//middleModal
export const MiddleModalContainer = Styled.View`
borderRadius: 24px;
backgroundColor: ${({ theme }) => theme.color.whiteBlack};
color: ${({ theme }) => theme.color.blackWhite};
padding: 24px;
`;

export const MiddleModalBackDrop = Styled.View`
flex: 1;
justifyContent: center;
`;
