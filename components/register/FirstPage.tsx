import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { RegisterForm } from "pages/auth/register";
import { CircleButton, RoundButton } from "@components/button/Button";
import { Box } from "@styles/Common";
import Link from "next/link";
import CheckBoxInput from "@components/CheckBoxInput";
import MessageBox from "@components/MessageBox";
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
    watch,
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
      <MessageBox>토리가 이용자님의 정보를 수집하고 안전하게 보호해요!</MessageBox>
      <CheckBoxInput
        label="모든 약관에 동의합니다."
        name="agree"
        register={register("agree", { required: "약관 동의 해주세요" })}
        error={errors.agree?.message}
      />
      <Box>
        <Link href="/auth/register/choice">
          <CircleButton nonSubmit>이전 페이지</CircleButton>
        </Link>
        <CircleButton disable={!(user?.agree || watch("agree"))}>다음 페이지</CircleButton>
      </Box>
    </form>
  );
};

export default FirstPage;
