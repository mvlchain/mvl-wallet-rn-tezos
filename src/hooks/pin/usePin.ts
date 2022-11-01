import { useState } from 'react';

import { pinStore } from '@@store/pin/pinStore';

function usePin() {
  const { pinMode } = pinStore();
  const [firstInput, setFirstInput] = useState([]);
  const [secondInput, setSecondInput] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);
  //셋업모드인지 컨펌모드인지 판단한다.
  //셋업모드인경우
  //키패드 입력을 받는다.
  //키패드에 따라 encrypt 해서 저장한다.
  //1개채워질때마다 password 색바꿔준다.
  //6개 채워지면 판단한다.
  //판단에 따라 가이드 문구를 보여준다.
  //다른경우 에러 보여줬다가 원래대로 보여주고 색상도 바꿔줌
  //두개 같으면 securekeychain에 저장하고 리턴

  //컨펌모드인경우
  //forget Pinnumber 버튼이 추가됨. 무슨 액션해야하지?
  //기존에 secureKeychain에 저장된거랑 일치하면 리턴
  //바이오랑 일치해도 리턴

  const backSpace = () => {};
  const bioAuth = () => {};
  const setPassword = () => {};

  return {
    length: firstInput.length,
    backSpace,
    bioAuth,
    setPassword,
    isError,
    errorMessage,
    step,
  };
}

export default usePin;
