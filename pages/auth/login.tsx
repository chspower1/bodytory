import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
import useApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import Modal from "@components/Modal";
import NaverLoginBtn from "@components/NaverLoginBtn";
import KakaoLoginBtn from "@components/KakaoLoginBtn";
import { USER_LOGIN } from "constant/queryKeys";

export interface LoginForm {
  accountId: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/auth/login");
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
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (loginForm: LoginForm) => {
    mutate({ ...loginForm, type: "origin" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="accountId"
          label="아이디"
          register={register("accountId", {
            required: "아이디를 입력해주세요.",
            // pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: "올바른 아이디 형식이 아닙니다." },
          })}
          placeholder="아이디를 입력해주세요."
          errorMessage={errors.accountId?.message}
        />
        <Input
          name="password"
          label="비밀번호"
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            // pattern: {
            //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
            //   message: "비밀번호가 안전하지 않아요.",
            // },
          })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.password?.message}
        />
        {/* <Input
          name="autoLogin"
          label="자동로그인"
          type="checkbox"
          register={register("autoLogin")}
          errorMessage={errors.password?.message}
        /> */}
        <button>로그인</button>
      </form>
      <Link href="/auth/help/find-id">
        <button>아이디 찾기</button>
      </Link>
      <Link href="/auth/help/find-pw">
        <button>비밀번호 찾기</button>
      </Link>
      <Link href="/auth/register/choice">
        <button>회원가입</button>
      </Link>
      <NaverLoginBtn mutate={mutate} />
      <KakaoLoginBtn mutate={mutate} />
      {/* <button onClick={() => setShowModal(true)}>Open Modal</button> */}
      {/* <Modal onClose={() => setShowModal(false)} activeFuction={} show={showModal} title={"임시 타이틀"}>
        children으로 주는거라 태그 사이에 쓰면 됩니다.
      </Modal> */}
    </div>
  );
};
export default LoginPage;
