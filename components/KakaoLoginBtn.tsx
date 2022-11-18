import { kakaoInit } from "@libs/client/kakaoInit";
import useApi from "@libs/client/useApi";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

const KakaoLoginBtn = ({ mutate }: { mutate: UseMutateFunction<any, any, any, unknown> }) => {
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
            console.log(res);

            // 카카오 로그인 요청
            mutate({
              id: res.id,
              type: "kakao",
              email: res.kakao_account.email,
              name: res.kakao_account.profile.nickname,
              birth: "2000",
              gender: res.kakao_account.gender,
              phone: "000-0000-000",
            });
          },
          fail: (error: any) => {
            console.log(error);
          },
        });
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };
  return <button onClick={kakaoLogin}>카카오 로그인</button>;
};
export default KakaoLoginBtn;
