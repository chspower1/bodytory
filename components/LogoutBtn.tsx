import customApi from "utils/client/customApi";
import axios from "axios";
import { useRouter } from "next/router";
import { RoundButton } from "./button/Button";
import { loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import Modal from "@components/Modal";
import { useState } from "react";

const LogoutBtn = () => {
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const [showModal, setShowModal] = useState(false);
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
    setCurrentUser(null);
    router.push("/auth/login");      
  };
  return (
    <>
    <RoundButton size="md" onClick={() => setShowModal(true)}>
      로그아웃
    </RoundButton>
    <Modal onClose={() => setShowModal(false)} activeFuction={handleClickLogout} show={showModal} title={"시스템"}>
      로그아웃 하시겠습니까?
    </Modal>
    </>
  );
};
export default LogoutBtn;
