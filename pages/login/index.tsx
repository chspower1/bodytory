import Input from "@components/Input";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface LoginForm {
  id: string;
  password: string;
}

const LoginPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onValid = (loginForm: LoginForm) => {
    console.log("로그인");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="id"
          label="아이디"
          register={register("id", { required: "아이디를 입력해주세요." })}
          placeholder="아이디를 입력해주세요."
          errorMessage={errors.id?.message}
        />
        <Input
          name="password"
          label="비밀번호"
          register={register("password", { required: "비밀번호를 입력해주세요." })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.password?.message}
        />
        <button>로그인</button>
      </form>
    </div>
  );
};
export default LoginPage;
