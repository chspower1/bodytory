import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import useApi from "@libs/client/useApi";

interface SecondRegisterForm {
  accountId: string;
  password: string;
  passwordConfirm: string;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const SecondPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<SecondRegisterForm>();

  const [isNotDuplicate, setIsNotDuplicate] = useState(false);

  const { postApi: checkAccountIdApi } = useApi("/api/auth/register/check/id");

  const AccountIdRegex = /^[a-zA-Z0-9]*$/;

  const onValid = (data: SecondRegisterForm) => {
    if (isNotDuplicate) {
      setUser(prev => ({ ...prev!, ...data }));
      setPage(cur => cur + 1);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      await checkAccountIdApi({ accountId: watch("accountId") });
      setIsNotDuplicate(true);
      alert("사용가능한 아이디입니다");
    } catch (err: any) {
      setError("accountId", { message: `${err.data}` });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        label="아이디"
        name="accountId"
        placeholder="아이디를 입력해주세요"
        register={register("accountId", {
          required: "아이디를 입력해주세요",
          validate: value => AccountIdRegex.test(value) || "아이디 형식에 맞지 않습니다.",
        })}
        errorMessage={errors.accountId?.message}
      />
      <button type="button" onClick={handleClickCheckAccountId}>
        중복확인
      </button>

      <Input
        type="password"
        label="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        register={register("password", {
          required: "비밀번호를 입력해주세요",
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //   message: "비밀번호가 안전하지 않아요.",
          // },
          validate: {
            checkPassword: value => {
              if (watch("password") !== value) return "아이디가 일치하지 않음";
            },
          },
        })}
        errorMessage={errors.password?.message}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="한번 더 입력해주세요"
        register={register("passwordConfirm", {
          required: "비밀번호 확인을 입력해주세요",
          validate: {
            checkPassword: value => {
              if (watch("password") !== value) return "아이디가 일치하지 않음";
            },
          },
        })}
        errorMessage={errors.passwordConfirm?.message}
      />
      <button type="submit">다음 페이지</button>
      <button type="button">이전 페이지</button>
    </form>
  );
};

export default SecondPage;
