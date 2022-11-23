import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import customApi from "utils/client/customApi";
import { CircleButton, RoundButton } from "@components/button/Button";
import { Box } from "@styles/Common";

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
    setValue,
    clearErrors,
  } = useForm<SecondRegisterForm>({
    mode: "onChange",
    defaultValues: {
      accountId: user?.accountId,
      password: user?.password,
      passwordConfirm: user?.passwordConfirm,
    },
  });
  const { postApi: checkAccountIdApi } = customApi("/api/auth/register/check/id");

  const Regex = /^[a-zA-Z0-9]{6,}$/;

  const onValid = (data: SecondRegisterForm) => {
    if (user?.isNotDuplicate) {
      if (watch("password") !== watch("passwordConfirm")) {
        return setError("passwordConfirm", { type: "custom", message: "비밀번호가 일치하지 않아요" });
      }
      setUser(prev => ({ ...prev!, ...data }));
      setPage(3);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      if (!watch("accountId")) return setError("accountId", { message: "아이디를 입력해주세요" });
      if (!Regex.test(watch("accountId"))) return;

      await checkAccountIdApi({ accountId: watch("accountId") });
      setUser(prev => ({ ...prev!, isNotDuplicate: true }));
      clearErrors("accountId");
      setError("password", { type: "custom", message: "사용하실 비밀번호를 입력해주세요" });
    } catch (err: any) {
      setError("accountId", { type: "custom", message: `이미 사용 중인 아이디에요!\n다른아이디를 입력해주세요` });
    }
  };

  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요";
  };

  const checkAccessNextPage = () => {};

  const isErrorsMessage = errors.accountId?.message || errors.password?.message || errors.passwordConfirm?.message;

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="errorMessageBox">
        {}
        {isErrorsMessage ? (
          isErrorsMessage.includes("\n") ? (
            isErrorsMessage.split("\n").map((ele, index) => <p key={index}>{ele}</p>)
          ) : (
            <p>{isErrorsMessage}</p>
          )
        ) : (
          !watch("accountId") && `사용하실 아이디를 입력해주세요`
        )}
      </div>
      <Input
        name="accountId"
        placeholder="toritori2022"
        register={register("accountId", {
          required: "사용하실 아이디를 입력해주세요",
          validate: value => Regex.test(value) || "아이디는 6자리 이상\n영문 대소문자, 숫자를 입력해주세요",
          onChange() {
            setUser(prev => ({ ...prev!, isNotDuplicate: false }));
            setValue("password", "");
            setValue("passwordConfirm", "");
          },
        })}
        error={errors.accountId?.message}
      />
      {!user?.isNotDuplicate && (
        <button type="button" onClick={handleClickCheckAccountId}>
          중복확인
        </button>
      )}

      {user?.isNotDuplicate && (
        <Input
          name="password"
          type="password"
          placeholder="●●●●●●"
          register={register("password", {
            required: "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 포함해서 입력해주세요",
            validate: value =>
              Regex.test(value) || "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 포함해서 입력해주세요",
            onChange() {
              if (watch("password").length < 6) {
                setValue("passwordConfirm", "");
              }
              if (watch("password") === watch("passwordConfirm")) {
                clearErrors("passwordConfirm");
              }
            },
          })}
        />
      )}
      {Regex.test(watch("password")) && user?.isNotDuplicate && (
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="●●●●●●"
          register={register("passwordConfirm", {
            required: "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요",
            validate: {
              checkPassword,
            },
          })}
        />
      )}
      <Box>
        <CircleButton nonSubmit size="md" onClick={() => setPage(1)}>
          이전 페이지
        </CircleButton>
        <CircleButton
          size="md"
          disable={
            user?.isNotDuplicate &&
            (watch("password") !== watch("passwordConfirm") || user?.password !== user?.passwordConfirm)
          }
        >
          다음 페이지
        </CircleButton>
      </Box>
    </form>
  );
};

export default SecondPage;
