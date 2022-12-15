<img src="./next/public/bodytory_banner.png" width="400px">

# BODYTORY

몸이 아픈데 <strong>어떤 진료과</strong>에 가야 하는지 햇갈리시나요?  
병원에 갔는데 <strong>증상이 명확하게 떠오르지 않아서</strong> 애먹은적이 있으신가요?  
예전에 진료받았던 내용이 <strong>기억나지 않아서</strong> 아쉬웠던 적이 있으신가요?  
그렇다면 바디토리(Bodytory)에서 각종 증상들을 부위별로 기록하고, 진료과를 추천받아보세요!

### **간편한 증상 기록**

<div>-------이미지첨부------</div>

- 현재 자신이 겪는 증상과 관련이 있는 부위를 선택해 증상을 기록할 수 있음
- 단순히 글로 서술하기 힘든 증상의 경우, 추후에 사진 자료 첨부 가능
- 부족하거나 잘못된 증상 기록의 수정/삭제 기능 지원
  <br/>
  <br/>

### **다양한 AI 서비스**

<div>-------이미지첨부------</div>

- 증상 기록들을 분석하여 어떤 진료과에 가야 하는지를 사용자에게 추천
- 전반적인 기록들을 토대로 사용자가 어떤 키워드를 자주 사용했는지 보여줌
- ETRI, 과학기술정보통신부에서 제공하는 AI를 기반으로 정확도 높은 음성 인식 기능 구현
  <br/>
  <br/>

### **병원 검색**

<div>-------이미지첨부------</div>

- 지도에서 사용자의 위치정보를 기반으로 주변 병원들을 검색하는 기능 제공
- 위치 기반 검색 외에도 병원명으로 검색하는 기능 또한 제공중
  <br/>
  <br/>

### **병원에 기록 공유**

<div>-------이미지첨부------</div>

- 서비스와 연계된 병원들 중 원하는 병원을 선택해 자신의 증상 기록들을 공유 가능
- 병원에서 사용자의 기록을 보고 간단한 진료내역을 작성 및 사용자에게 제공 가능함

---

## 기술 스택

 <!-- 프론트엔드 -->

### **Common**

  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
  <details>
  <summary>
  공통 기술 스택 자세히 보기
  </summary>
<br/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>

  <details>
    <summary>SSR + CSR</summary>
    Pre-Render가 빠르고 SEO가 최적화 되는 SSR의 장점과 상호작용이 효율적이고 잦은 데이터 변경환경에 유리한 CSR의 장점, 두 가지 장점 모두 살릴 수 있어 NextJS는 저희팀에게 좋은 선택지였습니다.
    </details>

  <details>
      <summary>풀스택</summary>
      팀원 모두 프론트엔드에 주력인 멤버였습니다.  
      시간이 비교적 짧은 현재 프로젝트에서 Next는 저희팀에게 프론트엔드,백엔드를 빠르고,효율적으로 구축할 수 있는 매력적인 프레임 워크였기에 채택하게 되었습니다.
    </details>

  <details>
    <summary>NextJS의 개발환경</summary>
      API router,Page router,middleware,Image,document 등 NextJS에서 제공하는 기능들은 개발자에게 편리한 개발환경을 제공하기에 NextJS를 채택하였습니다.
    </details>
<br/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>

  <details>
      <summary> Javascript의 한계</summary>
      Javascript는 타입에 제약이 없어 의도치 않은 문제점을 발생시킬 수 있습니다.  
        이러한 문제점은 디버깅을 쉽게 하지 못하게 되고 결국 개발생산성을 저하시키는 요인이 됩니다.
    </details>

  <details>
      <summary>최고의 개발 환경</summary>
      Typescript는 Javascript의 정적버전 언어입니다.동적타입 언어인 Javascript가 가진 단점을 명확한 타입 지정으로 보완이 가능하며,  
     이는 자동완성,타입유추 등 개발자에게 보다 나은 개발환경을 제공해줍니다.
    </details>

</details>
<br/>

### **Front-End**

  <img src="https://img.shields.io/badge/Recoil-black?style=flat-square&logo=Recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white"/>
 <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
   <img src="https://img.shields.io/badge/Framer-0055FF?style=flat-square&logo=Framer&logoColor=white"/>

   <details>
     <summary>
     Front-End 기술 스택 자세히 보기
     </summary>
     <br/>
     <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/>

   <details>
     <summary>보다 편한 비동기 처리</summary>

- Api 호출을 하는 일련의 과정을 Tanstack-Query에서 제공하는 hook을 통해 편리하게 사용할 수 있습니다.
  </details>
  <details>
  <summary>
  캐싱
  </summary>

  - 한번 처리된 데이터는 queryKey값을 통해 캐싱화 되며 불필요한 api호출을 줄일 수 있습니다.  
    이는 페이지 이동이 잦은 사용자에게 실시간 환경을 제공함으로서 보다 나은 사용자경험을 제공합니다.

</details>

<details>
<summary>강력한 비동기 상태관리</summary>

- Tanstack-Query에서 제공하는 hook 옵션들은 강력한 비동기 상태관리를 가능하게 합니다.  
Suspense에서 관리하는 3가지 상태(pendding,ready,errored)를 react-query에서 직접적으로 접근하여  
isLoading,isFetching,isError,onSuccess,onSettled 등의 옵션으로 간편하게 관리 할 수 있게 해주며,  
이러한 옵션들은 api 호출 시 발생되는 복잡한 다중 이벤트 처리에도 강력한 힘을 발휘합니다.  
또한 전역으로 설정하여 일괄적으로 조건부 처리 또한 가능합니다.
</details>
<br/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white"/>
<details><summary>
간편하고 강력한 Form 관리
</summary>

- React-Hook-Form에서 제공하는 hook은 간편하게 form을 관리할 수 있게 해줍니다.  
 valitate,error,value 등을 useForm hook에서 제공하는 옵션들로 모두 관리 할 수 있는 강력함을 가졌습니다.
</details>
<br/>
<img src="https://img.shields.io/badge/Recoil-black?style=for-the-badge&logo=Recoil&logoColor=white"/>

<details>
<summary>간편한 전역 상태 관리</summary>

- Context Api나 Redux에 비해 보일러플레이트가 훨씬 간소화 되어있고  
  React에서 제공하는 hooks의 형태를 띄고 있어 상태 수정 및 접근이 용이합니다.

</details>
<br/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>

<details>
<summary>
일괄적인 예외 처리
</summary>

- Intercepter를 통해 response,request에 접근하여 일괄적인 예외처리가 가능합니다.
  </details>

<details>
  <summary>
  Parsing
  </summary>

- axios는 자체적으로 response,requset 데이터를 parsing해주어서 fetch보다 간편하게 사용이 가능합니다.

</details>

</details>
<br/>

### **Back-End**

   <img src="https://img.shields.io/badge/Flask-555555?style=flat-square&logo=Flask&logoColor=white"/>
    <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
   <img src="https://img.shields.io/badge/Iron Session-DB7093?style=flat-square&logoColor=white"/>
   <img src="https://img.shields.io/badge/NodeMailer-black?style=flat-square&logo=Recoil&logoColor=white"/>
   <details>
   <summary>
   Back-End 기술 스택 자세히 보기
   </summary>
   <br/>
<img src="https://img.shields.io/badge/NodeMailer-black?style=for-the-badge&logo=Recoil&logoColor=white"/>

<details>
    <summary>
메일 전송 솔루션
    </summary>

- Node.js 환경에서 대표적인 메일전송 솔루션이며,
간단한 사용법으로 메일 전송이 가능합니다.  
저희 프로젝트에서는 인증메일을 보내는 용도로 사용했습니다.

  </details>
<br/>
<img src="https://img.shields.io/badge/Iron Session-teal?style=for-the-badge&logo=Recoil&logoColor=white"/>

<details>
    <summary>
로우레벨 코드로 구현 가능
    </summary>

- 다른 회원인증 방식에 비해 비교적 간단한 코드로 회원인증 구현이 가능합니다.

 </details>

<details>
    <summary>
Serverless환경에서의 회원인증
    </summary>

- JWT와 다르게 iron-session은 payload를 암호화해서 전달해주기 때문에 유저의 민감한 정보를 식별자로 사용하는 것도 가능합니다.  
 이는 유저의 정보를 서버에 저장하지 않더라도 회원인증 가능하게 해주고, serverless환경인 바디토리 프로젝트에 아주 좋은 회원인증 방식이라 판단했습니다.
</details>
<br/>
<img src="https://img.shields.io/badge/Flask-555555?style=for-the-badge&logo=Flask&logoColor=white"/>

<details>
    <summary>
가벼운 선택
    </summary>

- 파이썬 환경에서 모델을 불러와 결과을 예측하는 것이 수월하기 때문에 파이썬 기반인 백엔드 서버를 구축해야 했습니다.
  비교적 간단한 api를 구현하면 됐기 때문에 Django보다 가볍고 간단하게 구현할 수 있는 Flask를 선택했습니다.

</details>

- 자체적으로 학습시킨 모델들을 불러와 요청에 따른 예측값을 반환하는 용도로 사용중입니다.
<br/>

   </details>
  <br/>

### **Styled**

  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer-0055FF?style=flat-square&logo=Framer&logoColor=white"/>
<details>
   <summary>
   Style 기술 스택 자세히 보기
   </summary>
   <br/>
   <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<details>
  <summary>
효율적인 재사용
  </summary>

- 한번 선언으로 여러 곳에서 재사용이 가능하며, 필요의 경우 상속을 통해 부가적으로 수정하는 것 또한 가능합니다.
  </details>

   <details>
      <summary>
      조건부 스타일
      </summary>

  - props를 통해 javascript를 이용한 조건부 스타일링은 styled-components의 강력한 기능 중 하나입니다.
    </details>

    <details>
    <summary>
     전역 스타일 관리, Theme
    </summary>

- Theme을 통해 일괄적인 스타일 수정이 가능합니다.

  </details>

<br/>
<img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=Framer&logoColor=white"/>

<details>
    <summary>
강력하고 간편한 애니메이션
    </summary>

- Framer-motion을 이용하면 기존 css와 Javascript로 구현하기 어려운 애니메이션을 아주 간단하게 구현이 가능합니다.  
 언마운트되는 컴포넌트도 AnimatePresence를 통해 손쉽게 복잡한 애니메이션을 구현 할 수 있으며, layoutKey를 통해 컴포넌트간에 이어지는 애니메이션도 쉽게 구현이 가능합니다.

  </details>
<br/>
<img src="https://img.shields.io/badge/Swiper-0055FF?style=for-the-badge&logo=Swiper&logoColor=white"/>

<details>
    <summary>
손쉬운 슬라이더 구현
    </summary>

- 간편하게 완성도 높은 슬라이더를 구현 할 수 있습니다.

  </details>
   </details>
<br/>
   
  <!-- 백엔드 -->

### **DataBase**

   <img src="https://img.shields.io/badge/Planet Scale-000000?style=flat-square&logo=PlanetScale&logoColor=white"/>
    <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=Cloudflare&logoColor=white"/>
    <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white"/>
    <details>
    <summary>
    DB 기술 스택 자세히 보기
    </summary>
    <br/>
<img src="https://img.shields.io/badge/Planet Scale-000000?style=for-the-badge&logo=PlanetScale&logoColor=white"/>

<details>
  <summary>
Cloud MySQL

  </summary>

- 바디토리는 데이터 간의 종속성이 짙어서 관계형DB를 사용할 필요가 있었습니다.
  Planet Scale은 엄밀히 말하면 MySQL은 아니지만 MySQL과 거의 동일한 환경으로 작업할 수 있습니다.
  무엇보다 Cloud에 Serverless로 DB를 구축할 수 있고,무료인 Planet Scale을 DB로 채택하였습니다.
  </details>

<details>
    <summary>
      CLI
    </summary>

- CLI를 통해 데이터베이스 만들기부터 데이터 조작에 이르기까지 플래닛스케일 인스턴스의 거의 모든 부분을 제어할 수 있는 점은 개발생산성을 높여줍니다.

</details>
<br/>
 <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=Prisma&logoColor=white"/>

<details>
  <summary>
Planet Scale과 찰떡궁합

  </summary>

- Prisma는 Planet Scale과 아주 좋은 시너지 효과를 창출합니다.
Planet Scale만으로는 ForeignKey를 지원하지 않지만 Prisma를 사용하면 구현이 가능합니다.
</details>

<details>
  <summary>
Typescript와의 호환

  </summary>

- Prisma는 기본적으로 Typescript를 지원하고 있으며 Type 추론 및 Type지원 등 다양한 부가기능을 지원함으로서 개발생산성을 월등히 높여줍니다.
이번에 Prisma를 사용함으로서 상당히 만족스러운 개발경험을 느꼈습니다.
</details>

<details>
  <summary>
직관적인 Schema & SQL
  </summary>

- Prisma Schema는 직관적이며 자동으로 Migration을 생성해줍니다. Prisma에서 제공하는 Prisma Studio를 통해 데이터를 쉽게 탐색,조작 할 수 있습니다.  
 또한 Prisma Client는 직관적인 SQL문을 사용할 수 있으며, Typescript와 같이 사용한다면 자동완성 기능을 통해 새로운 차원의 개발자 경험을 느낄 수 있습니다.
</details>
<br/>
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white"/>

<details>
  <summary>
효율적인 이미지 관리
  </summary>

효율적인 이미지 데이터 관리를 위하여 CloudFlare Image 저장소를 사용하였습니다.

</details>
<details>
    <summary>
  이미지 최적화
    </summary>

- CloudFlare는 Resize,Object-fit 등을 지원하여 이미지 최적화에 많은 도움을 줍니다.

</details>

<details>

  <summary>
간편한 사용법
  </summary>

- CloudFlare는 이미지를 직접 Post요청으로 업로드하는 방식을 사용함으로서 간편한 이미지 업로드 구현이 가능합니다.
</details>
<br/>
    </details>
     <br/>

### **CI / CD**

  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=GitLab&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitLab Runner-FC6D26?style=flat-square&logo=GitLab&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
<details>
<summary>
CI/CD 기술 스택 자세히 보기
</summary>
<br/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"/>

<details>
  <summary>
배포 자동화
  </summary>

- 배포환경과 동일한 환경에서의 테스트가 가능하고, 이후 생성된 이미지를 기반으로 배포하는 것 또한 수월합니다.  
 => 멀티스테이지 빌드를 통해 이미지 크기 절감의 효과 또한 챙겼습니다
</details>
<br/>
<img src="https://img.shields.io/badge/GitLab Runner-FC6D26?style=for-the-badge&logo=GitLab&logoColor=white"/>

<details>
  <summary>
배포 자동화
  </summary>

- 바디토리 프로젝트는 Gitlab Runner를 통해 main 브렌치에 push할 시 자동으로 배포가 되게끔 설정했습니다.
</details>
</details>
<br/>

### **AI**

<img src="https://img.shields.io/badge/Word2Vec-FC6D26?style=for-the-badge&logoColor=white"/>

<details>
  <summary>
  인공지능
  </summary>

- 복잡한 레이어 구성 절차 없이 인자값들을 통해 쉽게 원하는 방향으로 학습시킬 수 있어서 채택했습니다
</details>
