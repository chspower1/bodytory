import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { RegisterForm } from "pages/auth/register";
interface FirstRegisterForm {
  agree: boolean;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const FirstPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FirstRegisterForm>();
  const onValid = () => {
    setPage(cur => cur + 1);
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        label="동의"
        name="agree"
        type="checkbox"
        register={register("agree", { required: "약관 동의 해주세요" })}
        errorMessage={errors.agree?.message}
      />
      <button>다음 페이지</button>
      <button type="button" >이전 페이지</button>
    </form>
  );
};

export default FirstPage;
