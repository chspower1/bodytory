import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { RegisterForm } from "pages/auth/register";
import { RoundButton } from "@components/Button";
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
  } = useForm<FirstRegisterForm>({
    mode: "onChange",
    defaultValues: {
      agree: user?.agree,
    },
  });

  const onValid = () => {
    setUser(prev => ({ ...prev!, agree: true }));
    if (user?.type !== "origin") {
      setPage(3);
    } else setPage(2);
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
      <RoundButton size="lg">다음 페이지</RoundButton>
    </form>
  );
};

export default FirstPage;
