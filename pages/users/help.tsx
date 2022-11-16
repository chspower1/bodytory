import Input from "@components/Input";
import useMutation from "@libs/client/useMutation";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
export interface HelpForm {
  email?: string;
  token?: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [mutation, { data, loading, error }] = useMutation<ResponseType>("/api/users/help");
  const [isToken, setIsToken] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HelpForm>();

  const onValid = (helpForm: HelpForm) => {
    if (loading) return;
    console.log(helpForm);
    mutation(helpForm);
    // reset();
  };
  useEffect(() => {
    // console.log(data?.ok);
    if (data?.ok) {
      if (isToken) {
        console.log("인증번호 인증 완료");
        // router.push("") 비밀번호 수정페이지(=비밀번호 재설정)으로 이동
      }

      setIsToken(true);
    }
  }, [data, router]);
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
        <button>{isToken ? "인증번호 확인" : "이메일 인증"}</button>
      </form>
      <Link href="/"></Link>
    </div>
  );
};
export default LoginPage;
