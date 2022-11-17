import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
export interface HelpForm {
  email?: string;
  token?: string;
  password?: string;
  confirmPassword?: string;
}

const HelpPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/users/help");
  const { data, mutateAsync } = useMutation(["help"], postApi, {
    onSuccess(data) {
      if (data?.ok) {
        if (isToken) {
          console.log("인증번호 인증 완료");
        }
        setIsToken(true);
      } else if (data?.ok === false) {
        alert("비밀번호 확인해주세요");
      }
    },
  });
  const [isResetMode, setIsResetMode] = useState(false);
  const [isToken, setIsToken] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HelpForm>();

  const onValid = (helpForm: HelpForm) => {
    console.log(helpForm);
    mutateAsync(helpForm);
    // reset();
  };
  useEffect(() => {
    // console.log(data?.ok);
  }, [data, router, isToken]);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name={"email"}
          label="이메일"
          register={register("email", {
            required: "이메일를 입력해주세요.",
            // pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, message: "올바른 이메일 형식이 아닙니다." },
          })}
          placeholder="이메일를 입력해주세요."
          errorMessage={errors.email?.message}
        />
        {isToken && (
          <Input
            name="token"
            label="인증번호"
            register={register("token", {
              required: "인증번호를 입력해주세요.",
            })}
            placeholder="인증번호를 입력해주세요."
            errorMessage={errors.token?.message}
          />
        )}
        <Input
          name="password"
          label="변경 비밀번호"
          register={register("password", {
            required: "변경할 비밀번호를 입력해주세요.",
          })}
          placeholder="변경할 비밀번호를 입력해주세요."
          errorMessage={errors.token?.message}
        />
        <Input
          name="token"
          label="인증번호"
          register={register("token", {
            required: "비밀번호를 확인해주세요.",
          })}
          placeholder="비밀번호를 확인해주세요."
          errorMessage={errors.token?.message}
        />
        <button>{isResetMode ? "비밀번호 변경" : isToken ? "인증번호 확인" : "이메일 인증"}</button>
      </form>
      <Link href="/"></Link>
    </div>
  );
};
export default HelpPage;
