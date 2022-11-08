# Folder Templates

https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure

우리 프로젝트에서 컴포넌트를 만들 때 다음과 같은 구조가 반복적으로 사용됩니다.

```plaintext
Component.tsx
Component.style.ts
Component.type.ts
useComponent.ts
index.ts
```

매 컴포넌트 제작마다 반복적으로 파일 생성함이 번거로웠습니다.

이를 해결하기 위해 `Folder Templates`라는 vscode extension을 사용했습니다.

## 사용 방법

1. `Folder Templates`라는 vscode extension을 설치합니다.

2. template생성을 원하는 곳에서 우클릭 후 `Create New Templated Folder`를 클릭합니다.
   ![스크린샷 2022-11-07 오후 5 24 39](https://user-images.githubusercontent.com/113417468/200261286-b604ec7e-26ec-4528-a823-6e085f6af1c3.png)

3. vscode 상단에 나타난 입력창에 Component이름을 입력 후 Enter를 누릅니다.
   ![스크린샷 2022-11-07 오후 5 19 34](https://user-images.githubusercontent.com/113417468/200260288-b3677675-328f-4c0c-bd6f-97bde1bb8958.png)

완료!

## Template 구성

Root Directory에 .fftemplates폴더를 만들어준 후 그 안에 Template를 작성해줍니다.

예제)
https://github.com/Huuums/vscode-folder-templates/tree/master/examples

Component이름은 `[FTName]` 이라는 변수로 template내에서 사용할 수 있습니다.
