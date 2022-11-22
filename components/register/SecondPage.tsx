import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import useApi from "utils/client/customApi";

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
    clearErrors,
  } = useForm<SecondRegisterForm>({
    mode: "onChange",
    defaultValues: {
      accountId: user?.accountId,
      password: user?.password,
      passwordConfirm: user?.passwordConfirm,
    },
  });

  const { postApi: checkAccountIdApi } = useApi("/api/auth/register/check/id");

  const AccountIdRegex = /^[a-zA-Z0-9]*$/;

  const onValid = (data: SecondRegisterForm) => {
    if (user?.isNotDuplicate) {
      setUser(prev => ({ ...prev!, ...data }));
      setPage(3);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      if (!watch("accountId")) return setError("accountId", { message: "아이디를 입력해주세요" });
      await checkAccountIdApi({ accountId: watch("accountId") });
      setUser(prev => ({ ...prev!, isNotDuplicate: true }));
      clearErrors("accountId");
      alert("사용가능한 아이디입니다");
    } catch (err: any) {
      setError("accountId", { message: `${err.data}` });
    }
  };
  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않음";
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
          onChange() {
            setUser(prev => ({ ...prev!, isNotDuplicate: false }));
          },
        })}
        errorMessage={errors.accountId?.message}
      />
      <button type="button" onClick={handleClickCheckAccountId} disabled={user?.isNotDuplicate}>
        {user?.isNotDuplicate ? "중복확인 완료" : "중복확인"}
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
          onChange() {
            if (watch("password") === watch("passwordConfirm")) setError("passwordConfirm", { message: "" });
          },
        })}
      />
      <Input
        type="password"
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="한번 더 입력해주세요"
        register={register("passwordConfirm", {
          required: "비밀번호 확인을 입력해주세요",
          validate: {
            checkPassword,
          },
        })}
        errorMessage={errors.passwordConfirm?.message}
      />
      <button type="button" onClick={() => setPage(1)}>
        이전 페이지
      </button>
      <button type="submit">다음 페이지</button>
    </form>
  );
};

export default SecondPage;
