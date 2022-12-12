# BODYTORY

## 사용 기술

<div>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-black?style=flat-square&logo=Recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=GitLab&logoColor=white"/>
</div>

왜?
=> 탄생배경,고민

## NextJS

- SSR + CSR

  - Pre-Render가 빠르고 SEO가 최적화 되는 SSR의 장점과 상호작용이 효율적이고 잦은 데이터 변경환경에 유리한 CSR의 장점, 두 가지 장점 모두 살릴 수 있어 NextJS는 저희팀에게 좋은 선택지였습니다.

- 풀스택

  - 팀원 모두 프론트엔드에 주력인 멤버였습니다.  
    시간이 짧은 프로젝트에서 Next는 저희팀에게 프론트엔드,백엔드를 빠르고,효율적으로 구축할 수 있는 최고의 프레임 워크였기에 채택하게 되었습니다.

- NextJS의 개발환경
  - API router,Page router,middleware,Image,document 등 NextJS에서 제공하는 기능들은 개발자에게 편리한 개발환경을 제공하기에 NextJS를 채택하였습니다.

## Typescript

- Javascript의 한계
  - Javascript는 타입에 제약이 없어 의도치 않은 문제점을 발생시킬 수 있습니다.  
    이러한 문제점은 디버깅을 쉽게 하지 못하게 되고 결국 개발환경을 저하시키는 요인이 됩니다.
- 최고의 개발 환경
  - Typescript는 Javascript의 정적버전 언어입니다.
    동적타입 언어인 Javascript가 가진 단점을 명확한 타입 지정으로 보완이 가능하며, 이는 개발자에게 보다 나은 개발환경을 제공해줍니다.

## Front-End

- ## React-Query

- 보다 편한 비동기 처리
  - Api 호출을 하는 일련의 과정을 Tanstack-Query에서 제공하는 hook을 통해 편리하게 사용할 수 있습니다.
- 캐싱
  - 한번 처리된 데이터는 queryKey값을 통해 캐싱화 되며 불필요한 api호출을 줄일 수 있습니다.  
    이는 페이지 이동이 잦은 사용자에게 실시간 환경을 제공함으로서 보다 나은 사용자경험을 제공합니다.
- 강력한 비동기 상태관리

  - Tanstack-Query에서 제공하는 hook 옵션들은 강력한 비동기 상태관리를 가능하게 합니다.  
    전역으로 설정하여 일괄적으로 조건부 처리 또한 가능하며,  
    api 호출 시 발생되는 복잡한 이벤트 처리에도 강력한 힘을 발휘합니다.

- ## React-Hook-Form

- 간편하고 강력한 Form 관리

  - React-Hook-Form에서 제공하는 hook은 간편하게 form을 관리할 수 있게 해줍니다.  
    valitate,error,value 등을 useForm hook에서 제공하는 옵션들로 모두 관리 할 수 있는 강력함을 가졌습니다.

- ## Recoil

- 간편한 전역 상태 관리
  - Context Api나 Redux에 비해 보일러플레이트가 훨씬 간소화 되어있고 React에서 제공하는 hooks의 형태를 띄고 있어 상태 수정 및 접근이 용이합니다.

## Style

- ## Styled-Components
  - 효율적인 재사용
    - 한번 선언으로 여러 곳에서 재사용이 가능하며, 필요의 경우 상속을 통해 부가적으로 수정하는 것 또한 가능합니다.
  - 조건부 스타일
    - props를 통해 javascript를 이용한 조건부 스타일링은 styled-components의 강력한 기능 중 하나입니다.
  - 전역 스타일 관리, Theme
    - Theme을 통해 일괄적인 스타일 수정이 가능합니다.
- ## Framer-Motion
  - 강력하고 간편한 애니메이션
    - Framer-motion을 이용하면 기존 css와 Javascript로 구현하기 어려운 애니메이션을 아주 간단하게 구현이 가능합니다.  
      언마운트되는 컴포넌트도 AnimatePresence를 통해 간단하게 애니메이션을 구현 할 수 있으며, layoutkey를 통해 컴포넌트간에 이어지는 애니메이션도 쉽게 구현이 가능합니다.
- ## Swiper
  - 간편하게 완성도 높은 슬라이더를 구현 할 수 있습니다.

## Back-End

- ## Axios
  - 일괄적인 예외 처리
    - Intercepter를 통해 response,request에 대한 일괄적인 예외처리가 가능합니다.
  - Parsing
    - axios는 자체적으로 response,requset 데이터를 parsing해주어서 fetch보다 간편하게 사용이 가능합니다.
- ## Nodemailer

  - 인증메일을 보내는 용도로 사용했으며, 간단한 사용법으로 메일 전송이 가능합니다

- ## Iron-Session

  - 로우레벨 코드

    - 비교적 간단한 코드로 회원인증 구현이 가능합니다.

  - Serverless환경에서의 회원인증
    - JWT와 다르게 iron-session은 payload를 암호화해서 전달해주기 때문에 유저의 민감한 정보를 식별자로 사용하는 것도 가능합니다.  
      이는 유저의 정보를 서버에 저장하지 않더라도 회원인증 가능하게 해주고, serverless환경인 바디토리 프로젝트에 아주 좋은 회원인증 방식이라 판단했습니다.
