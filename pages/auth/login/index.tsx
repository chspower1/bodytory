import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@utils/server/withHandler";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import Modal from "@components/Modal";
import NaverLoginBtn from "@components/button/NaverBtn";
import KakaoLoginBtn from "@components/button/KakaoBtn";
import { USER_LOGIN } from "constant/queryKeys";
import { RoundButton } from "@components/button/Button";
import Image from "next/image";
import naver from "/public/static/naver.svg";
import {
  Box,
  Col,
  InnerContainer,
  FlexContainer,
  Row,
  ToryText,
  WhiteBoldText,
  WhiteText,
  Wrapper,
} from "@styles/Common";
import { theme } from "@styles/theme";
import { checkEmptyObj } from "@utils/client/checkEmptyObj";
import { watch } from "fs";
import styled from "styled-components";
import MessageBox from "@components/MessageBox";
import { ACCOUNT_ID_REGEX, PASSWORD_REGEX } from "constant/regex";
import { loggedInUser } from "atoms/atoms";
import { useSetRecoilState } from "recoil";

export interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/login");
  const [isError, setIsError] = useState(false);
  const [isCompletion, setIsCompletion] = useState(false);
  const setCurrentUser = useSetRecoilState(loggedInUser);

  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);

      if (error.status === 401) {
        setIsError(true);
      }
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
      } else{
        setCurrentUser(data)
        return router.push("/");}
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const onValid = (loginForm: LoginForm) => {
    mutate({ ...loginForm, type: "origin" });
  };
  // console.log(errors, checkEmptyObj(errors));

  const isErrorsMessage = errors.accountId?.message || errors.password?.message;
  
  useEffect(() => {
    if(watch("accountId") && watch("password") && !isErrorsMessage){
      setIsCompletion(true);
    }else{
      setIsCompletion(false);
    }
    setIsError(false);
  }, [watch("accountId"), watch("password"),isErrorsMessage]);
  
  return (
    <FlexContainer>
      <InnerContainer>
        <MessageBox isErrorsMessage={isErrorsMessage}>
            {!isErrorsMessage &&
              (isError ? <>앗! 로그인 정보를 다시 한번 확인해주세요</> : <>로그인 정보를 입력해주세요</>)}
        </MessageBox>
        <LoginForm as="form" onSubmit={handleSubmit(onValid)}>
          <LoginFormInnerBox>
            <LoginInputAreaBox>
              <Input
                name="accountId"
                register={register("accountId", {
                  required: "아이디를 입력해주세요",
                  validate: {
                    checkAccountId: value =>
                      ACCOUNT_ID_REGEX.test(value) || "아이디는 6자리 이상\n영문 대소문자, 숫자를 입력해주세요",
                  },
                })}
                placeholder="아이디를 입력해주세요"
                error={errors.accountId}
              />
              <Input
                name="password"
                type="password"
                register={register("password", {
                  required: "비밀번호를 입력해주세요",
                  validate: {
                    regexPassword: value =>
                      PASSWORD_REGEX.test(value) ||
                      "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 조합해서 입력해주세요",
                  },
                })}
                placeholder="●●●●●●"
                error={errors.password}
              />
              {/* <Input
            name="autoLogin"
            label="자동로그인"
            type="checkbox"
            register={register("autoLogin")}
            errorMessage={errors.password?.message}
          /> */}
            </LoginInputAreaBox>
            <RoundButton size="lg" bgColor={theme.color.mintBtn} disable={!isCompletion}>
              로그인
            </RoundButton>
          </LoginFormInnerBox>
        </LoginForm>
        <LoginFindBox>
          <Link href="/auth/help/find-id">
            <WhiteText>아이디 찾기</WhiteText>
          </Link>
          <i>|</i>
          <Link href="/auth/help/find-pw">
            <WhiteText>비밀번호 찾기</WhiteText>
          </Link>
        </LoginFindBox>
        <SocialLoginBox>
          <div className="soscialInnerBox">
            <NaverLoginBtn size="sm" mutate={mutate} kind="login" />
            <KakaoLoginBtn size="sm" mutate={mutate} kind="login" />
          </div>
        </SocialLoginBox>
        <RegisterLinkBox>
          <WhiteText>아직 회원이 아니신가요?</WhiteText>
          <Link href="/auth/register/choice">
            <WhiteBoldText>회원가입</WhiteBoldText>
          </Link>
        </RegisterLinkBox>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {/* <Modal onClose={() => setShowModal(false)} activeFuction={} show={showModal} title={"임시 타이틀"}>
        children으로 주는거라 태그 사이에 쓰면 됩니다.
      </Modal> */}
      </InnerContainer>
    </FlexContainer>
  );
};
export default LoginPage;

export const ToryTextBox = styled.div`
  text-align: center;
  padding: 50px 0 65px;
  letter-spacing: -0.6px;
  word-spacing: -4px;
`;

const LoginForm = styled.form`
  display: flex;
  justify-content: center;
`;
export const LoginInputAreaBox = styled.div`
  margin-bottom: 40px;
`;
const LoginFormInnerBox = styled.div`
  display: inline-block;
`;
const LoginFindBox = styled(Row)`
  padding: 20px 0;
  margin: 0 0 70px;
  a {
    margin: 0 12px;
    span {
      font-size: 15px;
    }
  }
  i {
    color: #fff;
    user-select: none;
  }
`;
const SocialLoginBox = styled(Row)`
  margin: 0 0 30px;
  .soscialInnerBox {
    display: flex;
    > div,
    > button {
      margin: 0 20px;
      div {
        font-size: 16px;
      }
    }
  }
`;

const RegisterLinkBox = styled(Row)`
  padding: 20px 0;
  > span {
    font-size: 15px;
  }
  a {
    margin: 0 0 0 10px;
  }
`;
