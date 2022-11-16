import Input from "@components/Input";
import useMutation from "@libs/client/useMutation";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
export interface HelpForm {
  email: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [mutation, { data, loading, error }] = useMutation<ResponseType>("/api/users/help");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpForm>();

  const onValid = (loginForm: HelpForm) => {
    if (loading) return;
    mutation(loginForm);
  };
  useEffect(() => {
    // console.log(data?.ok);
    // if (data?.ok) router.push("/");
  }, [data, router]);
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

        <button>이메일 인증</button>
      </form>
      <Link href="/"></Link>
    </div>
  );
};
export default LoginPage;
