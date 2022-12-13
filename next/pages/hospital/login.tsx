import Input from "@components/layout/input/Input";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { HOSPITAL_LOGIN } from "constant/queryKeys";
import { RoundButton } from "@components/layout/buttons/Button";
import { InnerContainer, FlexContainer, Row, WhiteText } from "@styles/Common";
import { theme } from "@styles/theme";
import styled from "styled-components";
import MessageBox from "@components/MessageBox";
import { loggedInHospital } from "atoms/atoms";
import { useSetRecoilState } from "recoil";
import { LoginInputAreaBox } from "pages/auth/login";

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
      <HospitalInnerContainer>
        <TitleBox>
          <h2>병원 관리자 전용</h2>
        </TitleBox>
        <MessageBox isErrorsMessage={isErrorsMessage}>
          {isErrorsMessage === undefined &&
            (isError ? "앗! 로그인 정보를 다시 한번 확인해주세요" : "로그인 정보를 입력해주세요")}
        </MessageBox>
        <LoginForm as="form" onSubmit={handleSubmit(onValid)}>
          <LoginFormInnerBox>
            <LoginInputAreaBox>
              <Input
                $light
                name="accountId"
                register={register("accountId", {
                  required: "아이디를 입력해주세요",
                })}
                placeholder="아이디를 입력해주세요"
                error={errors.accountId || isError}
                motion={false}
              />
              <Input
                $light
                name="password"
                type="password"
                register={register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                placeholder="••••••"
                error={errors.password || isError}
                motion={false}
              />
            </LoginInputAreaBox>
            <RoundButton size="lg" bgColor={theme.color.mintBtn} disable={!isCompletion}>
              로그인
            </RoundButton>
          </LoginFormInnerBox>
        </LoginForm>
      </HospitalInnerContainer>
    </FlexContainer>
  );
};
export default LoginPage;

const HospitalInnerContainer = styled(InnerContainer)`
  .messageBox {
    color: #000;
  }
`;
const TitleBox = styled.div`
  margin-bottom: 20px;
  h2 {
    text-align: center;
    font-size: 34px;
    font-weight: 700;
  }
`;
const LoginForm = styled.form`
  display: flex;
  justify-content: center;
`;
const LoginFormInnerBox = styled.div`
  display: inline-block;
`;
