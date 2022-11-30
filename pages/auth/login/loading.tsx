import NaverLoginBtn from "@components/button/NaverBtn";
import { useMutation } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { USER_LOGIN } from "constant/queryKeys";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import Header from "@components/header/Header";

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bolder;
`;

const ButtonBox = styled.div`
  display: none;
`;

const Loading = () => {
  const iRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const setCurrentUser = useSetRecoilState(loggedInUser);
  const { postApi } = customApi("/api/auth/login");
  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);
    },
    onSuccess(data) {
      if (data.isNew) {
        console.log("----------------------------", data);
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else {
        setCurrentUser(data);
        return router.push("/");
      }
    },
  });

  useEffect(() => {
    const creater = setInterval(() => {
      if (iRef.current !== null) {
        iRef.current.innerText += ".";
        if (iRef.current.innerText.length > 3) {
          iRef.current.innerText = ".";
        }
      }
    }, 500);
    return () => {
      clearInterval(creater);
    };
  }, []);
  return (
    <LoadingBox>
      <Header />
      <div>
        유저 정보 조회중입니다<i ref={iRef}></i>
      </div>
      <ButtonBox>
        <NaverLoginBtn mutate={mutate} size={"sm"} kind={"login"} />
      </ButtonBox>
    </LoadingBox>
  );
};

export default Loading;
