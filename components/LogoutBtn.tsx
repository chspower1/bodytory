import customApi from "utils/client/customApi";
import axios from "axios";
import { useRouter } from "next/router";

const LogoutBtn = () => {
  const router = useRouter();
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  //   const { getApi: naverLogoutApi } = customApi("/oauth2.0/token");

  // 실제 서비스 코드
  // const { postApi: naverLogoutApi } = customApi("https://nid.naver.com/oauth2.0/token");
  const handleClickLogout = async () => {
    LogoutApi({});
    // console.log(localStorage.removeItem("naverToken"));
    const res = await axios.get("/oauth2.0/token", {
      params: {
        grant_type: "delete",
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
        access_token: localStorage.getItem("naverToken"),
        service_provider: "NAVER",
      },
    });
    console.log(res);
    router.push("/auth/login");
  };
  return <button onClick={handleClickLogout}>로그아웃</button>;
};
export default LogoutBtn;
