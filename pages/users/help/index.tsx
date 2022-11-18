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
  accountId?: string;
  email?: string;
  token?: string;
  password?: string;
  passwordConfirm?: string;
}

const HelpPage: NextPage = () => {
  const router = useRouter();
  const { postApi } = useApi("/api/users/help");
  const [isToken, setIsToken] = useState(false);
  const [email, setEmail] = useState("");
  const [accountId, setAccountId] = useState("");
  const { mutateAsync } = useMutation(["help"], postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess(data) {
      setEmail(data.email);
      setAccountId(data.accountId);
      console.log(data);
      if (isToken) {
        console.log("인증번호 인증 완료");
        router.push(
          {
            pathname: "/users/help/reset",
            query: { email, accountId },
          },
          "/users/help/reset",
        );
      }
      setIsToken(true);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpForm>();

  const onValid = (helpForm: HelpForm) => {
    console.log(helpForm);
    mutateAsync(helpForm);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name={"accountId"}
          label="아이디"
          register={register("accountId", {
            required: "아이디를 입력해주세요.",
          })}
          placeholder="아이디를 입력해주세요."
          errorMessage={errors.accountId?.message}
        />
        {isToken && (
          <>
            <div>{email}</div>
            <Input
              name="token"
              label="인증번호"
              register={register("token", {
                required: "인증번호를 입력해주세요.",
              })}
              placeholder="인증번호를 입력해주세요."
              errorMessage={errors.token?.message}
            />
          </>
        )}

        <button>{isToken ? "인증번호 확인" : "이메일 인증"}</button>
      </form>
    </div>
  );
};
export default HelpPage;
