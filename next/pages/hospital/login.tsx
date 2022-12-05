import Input from "@components/Input";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { HOSPITAL_LOGIN } from "constant/queryKeys";
import { RoundButton } from "@components/buttons/Button";
import {
  InnerContainer,
  FlexContainer,
  Row,
  WhiteText,
} from "@styles/Common";
import { theme } from "@styles/theme";
import styled from "styled-components";
import MessageBox from "@components/MessageBox";
import { loggedInHospital } from "atoms/atoms";
import { useSetRecoilState } from "recoil";

export interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/hospital/login");
  const [isError, setIsError] = useState(false);
  const [isCompletion, setIsCompletion] = useState(false);
  const setCurrentHospital = useSetRecoilState(loggedInHospital);

  const { mutate } = useMutation([HOSPITAL_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);
      setIsError(true);
    },
    onSuccess(data) {
      setCurrentHospital(data);
      router.push("/hospital");
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

  const isErrorsMessage = errors.accountId?.message || errors.password?.message;

  useEffect(() => {
    if (watch("accountId") && watch("password") && !isErrorsMessage) {
      setIsCompletion(true);
    } else {
      setIsCompletion(false);
    }
    setIsError(false);
  }, [watch("accountId"), watch("password"), isErrorsMessage]);

  return (
    <FlexContainer>
      <InnerContainer>
        <MessageBox isErrorsMessage={isErrorsMessage}>
          {isErrorsMessage === undefined &&
            (isError ? <>앗! 로그인 정보를 다시 한번 확인해주세요</> : <>로그인 정보를 입력해주세요</>)}
        </MessageBox>
        <LoginForm as="form" onSubmit={handleSubmit(onValid)}>
          <LoginFormInnerBox>
            <LoginInputAreaBox>
              <Input
                name="accountId"
                register={register("accountId", {
                  required: "아이디를 입력해주세요",
                })}
                placeholder="아이디를 입력해주세요"
                error={errors.accountId || isError}
                motion={false}
              />
              <Input
                name="password"
                type="password"
                register={register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                placeholder="●●●●●●"
                error={errors.password || isError}
                motion={false}
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
