import Input from "@components/Input";
import useMutation from "@libs/client/useMutation";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@libs/server/withHandler";
import Link from "next/link";
export interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [mutation, { data, loading, error }] = useMutation<ResponseType>("/api/users/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onValid = (loginForm: LoginForm) => {
    if (loading) return;
    console.log("로그인");
    mutation(loginForm);
  };
  useEffect(() => {
    console.log(data?.ok);
    if (data?.ok) router.push("/");
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
        <button>로그인</button>
      </form>
      <Link href="/users/help">
        <button>비밀번호 찾기</button>
      </Link>
    </div>
  );
};
export default LoginPage;
