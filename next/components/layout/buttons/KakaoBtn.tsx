import { kakaoInit } from "utils/client/kakaoInit";
import { useState } from "react";
import { SocialButton } from "./Button";
import { SocialBtnProps } from "./NaverBtn";

const KakaoLoginBtn = ({ mutate, size, kind }: SocialBtnProps) => {
  const kakaoLogin = async () => {
    // 카카오 초기화
    const kakao = kakaoInit();

    // 카카오 로그인 구현
    kakao.Auth.login({
      success: () => {
        kakao.API.request({
          url: "/v2/user/me", // 사용자 정보 가져오기
          success: (res: any) => {
            // 로그인 성공할 경우 정보 확인 후 /kakao 페이지로 push

            // 카카오 로그인 요청
            mutate({
              accountId: res.id + "",
              type: "kakao",
              email: res.kakao_account.email,
              name: res.kakao_account.profile.nickname,
              birth: "",
              gender: res.kakao_account.gender,
            });
          },
          fail: (error: any) => {},
        });
      },
      fail: (error: any) => {},
    });
  };
  const [comment, _] = useState(kind === "login" ? "로그인" : "회원가입");
  return (
    <SocialButton
      social="kakao"
      onClick={kakaoLogin}
      size={size}
      bgColor={kind === "login" ? "rgb(75, 80, 211)" : "rgb(61, 66, 191)"}
    >
      카카오로 {comment}
    </SocialButton>
  );
};
export default KakaoLoginBtn;
