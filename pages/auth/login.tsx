import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import Modal from "@components/Modal";
import NaverLoginBtn from "@components/NaverLoginBtn";
export interface LoginForm {
  email: string;
  password: string;
  autoLogin?: boolean;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/auth/login");
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useMutation(["login"], postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess() {
      router.push("/");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (loginForm: LoginForm) => {
    mutate(loginForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="email"
          label="이메일"
          register={register("email", {
            required: "이메일를 입력해주세요.",
            // pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: "올바른 이메일 형식이 아닙니다." },
          })}
          placeholder="이메일를 입력해주세요."
          errorMessage={errors.email?.message}
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
      <Link href="/users/help">
        <button>비밀번호 찾기</button>
      </Link>
      <Link href="/users/register">
        <button>회원가입</button>
      </Link>
      <NaverLoginBtn mutate={mutate} />
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal onClose={() => setShowModal(false)} show={showModal} title={"임시 타이틀"}>
        children으로 주는거라 태그 사이에 쓰면 됩니다.
      </Modal>
    </div>
  );
};
export default LoginPage;
