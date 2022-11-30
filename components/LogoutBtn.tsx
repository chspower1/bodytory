import customApi from "utils/client/customApi";
import axios from "axios";
import { useRouter } from "next/router";
import { RoundButton } from "./button/Button";
import { loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { USER_LOGIN } from "constant/queryKeys";

const LogoutBtn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  //   const { getApi: naverLogoutApi } = customApi("/oauth2.0/token");
  // 실제 서비스 코드
  // const { postApi: naverLogoutApi } = customApi("https://nid.naver.com/oauth2.0/token");
  const handleClickLogout = async () => {
    // console.log(localStorage.removeItem("naverToken"));
    try {
      const res = await axios.get("/oauth2.0/token", {
        params: {
          grant_type: "delete",
          client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
          access_token: localStorage.getItem("naverToken"),
          service_provider: "NAVER",
        },
      });
      setCurrentUser(null);
      await LogoutApi({});
      queryClient.removeQueries(USER_LOGIN);
      router.push("/auth/login");
    } catch (err) {
      console.log("logout Err");
    }
  };
  return (
    <>
      <RoundButton size="md" onClick={handleClickLogout}>
        로그아웃
      </RoundButton>
    </>
  );
};
export default LogoutBtn;
