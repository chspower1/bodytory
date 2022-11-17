import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
interface ResetForm {
  password: string;
  confirmPassword: string;
}

const Reset: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/users/help/reset");
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
  } = useForm<ResetForm>();

  const onValid = (resetForm: ResetForm) => {
    console.log(resetForm);
    mutateAsync(resetForm);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="password"
          label="변경 비밀번호"
          register={register("password", {
            required: "변경할 비밀번호를 입력해주세요.",
          })}
          placeholder="변경할 비밀번호를 입력해주세요."
          errorMessage={errors.password?.message}
        />
        <Input
          name="confirmPassword"
          label="비밀번호 확인"
          register={register("confirmPassword", {
            required: "비밀번호를 확인해주세요.",
          })}
          placeholder="비밀번호를 확인해주세요."
          errorMessage={errors.confirmPassword?.message}
        />
        <button>비밀번호 변경</button>
      </form>
    </div>
  );
};
export default Reset;
