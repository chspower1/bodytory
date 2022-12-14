import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { KoreanPosition } from "types/write";
interface MapPathToSeo {
  [key: string]: { title: string | undefined; description: string | undefined };
}
const mapPathToSeo: MapPathToSeo = {
  "/": { title: "홈", description: "바디토리에 오신것을 환영해요! 오늘 나의 몸상태를 꼼꼼히 기록해보세요!" },
  // about
  "/about/team": { title: "팀 소개", description: "바디토리를 만든 멤버들이에요!" },
  "/about/bodytory": {
    title: "소개",
    description: "바디토리 사용법을 모르시겠다구요? 소개페이지를 읽어보면서 바디토리 사용법을 익혀보세요!",
  },
  // auth
  "/auth/login": {
    title: "로그인",
    description: "바디토리에 오신것을 환영합니다! 로그인하시고 나의 몸상태를 기록해보세요!",
  },
  "/auth/login/loading": {
    title: "로딩 중",
    description: "로딩 중이에요!",
  },
  "/auth/logout": {
    title: "로그아웃",
    description: "바디토리에 오신것을 환영합니다! 로그인하시고 나의 몸상태를 기록해보세요!",
  },
  "/auth/register": {
    title: "회원가입",
    description: "바디토리에 오셔서 감사해요! 회원가입을 하시고 바디토리 서비스를 이용해보세요!",
  },
  "/auth/register/choice": {
    title: "회원가입(선택)",
    description: "원하는 방식으로 회원가입을 진행 할 수 있어요! 원하는 회원가입방식을 선택해주세요!",
  },
  "/auth/register/success": {
    title: "회원가입 성공",
    description: "바디토리 회원이 되신걸 축하드려요! 바디토리와 함께 나의 몸상태를 꼼꼼히 기록해봐요!",
  },
  "/auth/help": {
    title: "계정관리",
    description: "아이디 혹은 비밀번호를 잊으셨나요? 바디토리가 같이 찾을 수 있게 도와드릴게요.",
  },
  "/auth/help/find-id": {
    title: "계정관리",
    description: "아이디 혹은 비밀번호를 잊으셨나요? 바디토리가 같이 찾을 수 있게 도와드릴게요.",
  },
  "/auth/help/find-pw": {
    title: "계정관리",
    description: "아이디 혹은 비밀번호를 잊으셨나요? 바디토리가 같이 찾을 수 있게 도와드릴게요.",
  },
  "/auth/help/reset": {
    title: "계정관리",
    description: "아이디 혹은 비밀번호를 잊으셨나요? 바디토리가 같이 찾을 수 있게 도와드릴게요.",
  },
  "/auth/withdraw": { title: "회원탈퇴", description: "바디토리를 나가시겠어요? 다음에 또 좋은 서비스로 보답할게요." },
  // hospital
  "/hospital": {
    title: "병원",
    description: "바디토리 병원유저 페이지에요. 회원님들의 증상을 확인해보시고 진단결과를 남겨주세요!",
  },
  "/hospital/chart": {
    title: "증상기록",
    description: "우리 병원에서 치료받고 계신 바디토리 회원님들의 증상기록이에요. ",
  },
  "/hospital/login": {
    title: "병원로그인",
    description:
      "바디토리 병원회원님 안녕하세요. 로그인을 완료하시고 우리 병원에 다니고 있는 환자들의 기록을 살펴보세요.",
  },
  // users
  "/users": { title: "유저", description: "회원님의 정보에요!" },
  "/users/my-hospital": { title: "나의 병원", description: "현재 등록되어 있는 나의 병원 목록이에요." },
  "/users/my-hospital/clinic-list": {
    title: "진료기록",
    description: "현재까지 받은 회원님의 진료내역이에요. 병원에서 내려준 진단 결과를 확인해보세요!",
  },
  "/users/my-hospital/find": { title: "병원 찾기", description: "바디토리가 찾으시는 병원을 찾아드릴게요!" },
  "/users/records": {
    title: "나의 기록",
    description: "회원님의 몸상태를 체크해드릴게요! 추천 진료과목 및 키워드 별로 확인해보세요!",
  },
  "/users/records/write": { title: "기록하기", description: "나의 몸상태를 기록해보세요! 기록할 부위를 선택해주세요!" },
  "/users/records/write/analysis": {
    title: "분석 중",
    description: "토리가 회원님의 기록을 인공지능으로 분석하고 있어요! 잠시만 기다려 주세요!",
  },

  //ETC
  "/landing": { title: "병원", description: "홈 화면 입니다." },
};

Object.entries(KoreanPosition).forEach(([key, value]) => {
  mapPathToSeo[`/users/records/chart/${key}`] = {
    title: `나의 기록 (${value!})`,
    description: `${value}에 대한 나의 기록을 확인해보세요!`,
  };
  mapPathToSeo[`/users/records/write/${key}`] = {
    title: `기록하기 (${value!})`,
    description: `${value}에 대한 기록을 남겨주세요!`,
  };
  mapPathToSeo[`/users/hospital/chart/${key}`] = {
    title: `${value!} 증상보기`,
    description: `${value}에 증상을 확인해보세요!`,
  };
  mapPathToSeo[`/users/records/write/add?position=${key}`] = {
    title: `${value!} 기록완료`,
    description: `${value}에 대한 기록을 완료했어요! 더 기록할게 있으시면 "네, 다른 부위도 기록할래요"를 눌러서 추가적으로 기록해보세요!`,
  };
});

const withGetServerSideProps = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const pagePath = context.resolvedUrl;
    console.log(pagePath);
    return await getServerSideProps(context).then((res: { [key: string]: any }) => {
      return {
        ...res,
        props: {
          ...res.props,
          seoData: mapPathToSeo[pagePath],
        },
      };
    });
  };
};
export default withGetServerSideProps;
