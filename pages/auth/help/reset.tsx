import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@utils/server/withHandler";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { HELP_FIND_PASSWORD } from "constant/queryKeys";
import { RoundButton } from "@components/button/Button";

interface ResetForm {
  password: string;
  passwordConfirm: string;
}

const Reset: NextPage = () => {
  const router = useRouter();
  const { putApi } = customApi("/api/auth/help/reset");
  const { mutateAsync } = useMutation([HELP_FIND_PASSWORD], putApi, {
    onSuccess(data) {
      router.push("/auth/login");
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ResetForm>();

  const onValid = (resetForm: ResetForm) => {
    console.log(resetForm);
    mutateAsync({ accountId: router.query.accountId, password: resetForm.password });
  };

  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않음";
  };

  useEffect(() => {
    console.log(router.query);
    if (router.asPath !== "/auth/help/reset" || !router.query.email) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <div>
      <div>{router.query?.email}</div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="password"
          label="변경 비밀번호"
          register={register("password", {
            required: "변경할 비밀번호를 입력해주세요.",
          })}
          placeholder="변경할 비밀번호를 입력해주세요."
        />
        <Input
          name="passwordConfirm"
          label="비밀번호 확인"
          register={register("passwordConfirm", {
            required: "비밀번호를 확인해주세요.",
            validate: {
              checkPassword,
            },
          })}
          placeholder="비밀번호를 확인해주세요."
        />
        <RoundButton size="lg">비밀번호 변경</RoundButton>
      </form>
    </div>
  );
};
export default Reset;
