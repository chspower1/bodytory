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
import NaverLoginBtn from "@components/button/NaverLoginBtn";
import KakaoLoginBtn from "@components/button/KakaoLoginBtn";
import { USER_LOGIN } from "constant/queryKeys";
import { RoundButton } from "@components/button/Button";
import Image from "next/image";
import naver from "/public/static/naver.svg";
import { Box, Col, Row, WhiteBoldText, WhiteText, Wrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import { checkEmptyObj } from "@utils/client/checkEmptyObj";
import { watch } from "fs";
export interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/login");
  // const [showModal, setShowModal] = useState(false);

  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);

      if (error.status === 401) {
        alert("회원정보가 옳지 않습니다.");
      }
    },
    onSuccess(data) {
      console.log(data);
      if (data.isNew) {
        console.log("----------------------------", data);
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else return router.push("/");
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
  console.log(errors, checkEmptyObj(errors));

  useEffect(() => {
    setError("accountId", { type: "required" });
    setError("password", { type: "required" });
  }, []);
  return (
    <Wrapper>
      <Col>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            name="accountId"
            register={register("accountId", {
              required: "아이디를 입력해주세요.",
              // pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: "올바른 아이디 형식이 아닙니다." },
            })}
            placeholder="아이디를 입력해주세요."
            error={errors.accountId?.message}
          />
          <Input
            name="password"
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
              // pattern: {
              //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
              //   message: "비밀번호가 안전하지 않아요.",
              // },
            })}
            placeholder="비밀번호를 입력해주세요."
            error={errors.password?.message}
          />
          {/* <Input
          name="autoLogin"
          label="자동로그인"
          type="checkbox"
          register={register("autoLogin")}
          errorMessage={errors.password?.message}
        /> */}
          <RoundButton size="lg" bgColor={theme.color.mintBtn} disable={!checkEmptyObj(errors)}>
            로그인 하기
          </RoundButton>
        </form>

        <Row>
          <Link href="/auth/help/find-id">
            <WhiteText>아이디 찾기</WhiteText>
          </Link>
          <WhiteText> | </WhiteText>
          <Link href="/auth/help/find-pw">
            <WhiteText>비밀번호 찾기</WhiteText>
          </Link>
        </Row>
        <Row>
          <NaverLoginBtn size="sm" mutate={mutate} />
          <KakaoLoginBtn size="sm" mutate={mutate} />
        </Row>
        <Row>
          <Link href="/auth/register/choice">
            <WhiteText>
              아직 회원이 아니신가요? <WhiteBoldText>회원가입</WhiteBoldText>
            </WhiteText>
          </Link>
        </Row>
        {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
        {/* <Modal onClose={() => setShowModal(false)} activeFuction={} show={showModal} title={"임시 타이틀"}>
        children으로 주는거라 태그 사이에 쓰면 됩니다.
      </Modal> */}
      </Col>
    </Wrapper>
  );
};
export default LoginPage;
