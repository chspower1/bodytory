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
  const { mutateAsync } = useMutation(["help"], postApi, {
    onSuccess(data) {
      if (data.ok) {
        router.push("/users/login");
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();

  const onValid = (resetForm: ResetForm) => {
    console.log(resetForm);
    mutateAsync({ email: router.query.email, password: resetForm.password });
  };
  useEffect(() => {
    console.log(router);
    if (router.asPath !== "/users/help/reset" || !router.query.email) {
      router.push("/users/login");
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
