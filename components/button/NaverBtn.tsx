import customApi from "utils/client/customApi";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ButtonSize, RoundButton, SocialButton } from "./Button";

export interface SocialBtnProps {
  mutate: UseMutateFunction<any, any, any, unknown>;
  size: ButtonSize;
  kind: "login" | "register";
}

const NaverLoginBtn = ({ mutate, size, kind }: SocialBtnProps) => {
  const naverRef = useRef<any>();
  const router = useRouter();
  const [comment, _] = useState(kind === "login" ? "로그인" : "회원가입");
  const handleNaverLogin = () => {
    naverRef?.current!.children[0].click();
  };
  useEffect(() => {
    const naver = (window as any).naver;
    let naverLogin: any;
    const login = () => {
      naverLogin = new naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // ClientID
        callbackUrl: "http://localhost:3000/auth/login", // Callback URL
        isPopup: false, // 팝업 형태로 인증 여부
        loginButton: {
          color: "green", // 색상
          type: 3, // 버튼 크기
          height: "60", // 버튼 높이
        }, // 로그인 버튼 설정
      });

      naverLogin.init();
    };
    const getToken = () => {
      const hash = router.asPath.split("#")[1]; // 네이버 로그인을 통해 전달받은 hash 값
      if (hash) {
        const token = hash.split("=")[1].split("&")[0]; // token값 확인
        console.log(token);
        localStorage.setItem("naverToken", token);
        naverLogin.getLoginStatus((status: boolean) => {
          // 로그인 상태 값이 있을 경우
          if (status) {
            // 사용자 정보 조회
            console.log(naverLogin.user);
            const { email, mobile, name, birthyear, gender, id: accountId } = naverLogin.user;
            // 네이버 로그인 요청
            mutate({
              accountId,
              type: "naver",
              email,
              phone: mobile,
              name,
              birth: birthyear,
              gender: gender === "M" ? "male" : "female",
            });
          }
        });
      }
    };
    login();
    getToken();
  }, [mutate, router]);
  return (
    <SocialButton
      onClick={handleNaverLogin}
      social="naver"
      size={size}
      bgColor={kind === "login" ? "rgb(75, 80, 211)" : "rgb(61, 66, 191)"}
    >
      네이버 {comment}
      <button ref={naverRef} id="naverIdLogin" style={{ display: "none" }} />
    </SocialButton>
  );
};
export default NaverLoginBtn;
