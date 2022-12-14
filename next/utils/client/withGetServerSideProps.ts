import { GetServerSideProps, GetServerSidePropsContext } from "next";

const PATH = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  TEAM: "/about/team",
  BODYTORY: "/about/bodytory",
  HELP: "/auth/help/find-id" || "auth/help/find-pw" || "auth/help/reset",
  WITHDRAW: "/auth/withdraw",
};
interface MapPathToSeo {
  [key: string]: { title: string; description: string };
}
const mapPathToSeo: MapPathToSeo = {
  "/": { title: "홈", description: "홈 화면 입니다." },
  // about
  "/about/team": { title: "팀 소개", description: "바디토리를 만든 멤버들이에요!" },
  "/about/bodytory": { title: "소개", description: "바디토리 서비스 이용법이에요." },
  // auth
  "/auth/login": { title: "홈", description: "홈 화면 입니다." },
  "/auth/register": { title: "회원가입", description: "바디토리 회원가입 페이지 입니다." },
  "/auth/register/choice": { title: "회원가입", description: "바디토리 회원가입 페이지 입니다." },
  "/auth/register/success": { title: "회원가입", description: "바디토리 회원가입 페이지 입니다." },
  "/auth/help": { title: "계정관리", description: "계정관리 페이지 입니다." },
  "/auth/withdraw": { title: "회원탈퇴", description: "회원탈퇴 입니다." },
  // hospital
  "/hospital": { title: "병원", description: "홈 화면 입니다." },
};

const withGetServerSideProps = (getServerSideProps: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const pagePath = context.resolvedUrl;
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
