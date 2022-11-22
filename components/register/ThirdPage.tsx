import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import useApi from "utils/client/customApi";
import { Gender } from "@prisma/client";
import styled from "styled-components";
import useReset from "@hooks/useReset";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_SIGNUP } from "constant/queryKeys";
import { useRouter } from "next/router";

interface ThirdRegisterForm {
  email: string;
  token: string;
  gender: Gender;
  name: string;
  birth: string;
  phone?: string;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const ThirdPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const { birth, email, gender, name, phone, type } = user!;

  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
  } = useForm<ThirdRegisterForm>({ mode: "onChange", defaultValues: { birth, email, gender, name, phone } });
  const { isToken, setIsToken, ResetBtn } = useReset({ setValue });
  const { postApi: createUser } = useApi("/api/auth/register");
  const { postApi: checkEmailApi } = useApi("/api/auth/register/check/email");
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const isTokenInData = { email: watch("email"), token: isToken ? watch("token") : false, type };
  const { mutate } = useMutation([REGISTER_SIGNUP], createUser, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess() {
      router.replace("/");
    },
  });
  const handleClickCheckEmail = async () => {
    try {
      if (!errors.email) {
        const data = await checkEmailApi(isTokenInData);
        if (data?.ok && isToken && watch("token")) {
          setUser(prev => ({ ...prev!, isCertified: true }));
        }
        if (!watch("token")) {
          setError("token", { type: "custom", message: "인증번호를 입력해주세요" });
        }
        setIsToken(true);
      }
    } catch (err: any) {
      if (isToken) {
        return setError("token", { type: "custom", message: `${err.data}` });
      }
      setError("email", { type: "custom", message: `${err.data}` });
    }
  };
  const handleClickPrevPage = () => {
    if (user?.type !== "origin") {
      setPage(1);
    } else setPage(2);
  };
  const onValid = (data: ThirdRegisterForm) => {
    mutate({ ...user, ...data });
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        label="이름"
        name="name"
        register={register("name", { required: "이름을 입력해주세요" })}
        errorMessage={errors.name?.message}
      />
      <Input
        label="생일"
        name="birth"
        register={register("birth", {
          required: "생일을 입력해주세요",
          validate: value => /[0-9\-]/g.test(value) || "숫자만 입력해주세요",
        })}
        errorMessage={errors.birth?.message}
      />
      <GenderBox>
        <h4>성별</h4>
        <div className="innerBox">
          <div className="inputBox">
            <input
              id="registerGenderMale"
              type="radio"
              value={"male"}
              {...register("gender", { required: "성별을 선택해주세요" })}
            />
            <GenderLabel htmlFor="registerGenderMale">남자</GenderLabel>
          </div>
          <div className="inputBox">
            <input
              id="registerGenderFeMale"
              type="radio"
              value={"female"}
              {...register("gender", { required: "성별을 선택해주세요" })}
            />
            <GenderLabel htmlFor="registerGenderFeMale">여자</GenderLabel>
          </div>
        </div>
        <p>{errors.gender?.message}</p>
      </GenderBox>
      <Input
        label="이메일(본인인증 확인용!!!)"
        name="email"
        disabled={isToken}
        placeholder="abc@abc.com"
        register={register("email", {
          required: "이메일을 입력해주세요",
          validate: value => emailRegex.test(value) || "이메일 형식에 맞지 않습니다",
        })}
        errorMessage={errors.email?.message}
      />
      <ResetBtn />
      {!user?.isCertified ? (
        <>
          {isToken && (
            <Input
              name="token"
              label="인증번호"
              register={register("token", {
                required: "인증번호를 입력해주세요.",
                validate: value => /[0-9]/.test(value) || "숫자만 입력해주세요",
              })}
              placeholder="인증번호를 입력해주세요."
              errorMessage={errors.token?.message}
            />
          )}
          <button type="button" onClick={handleClickCheckEmail}>
            {isToken ? "인증번호 확인" : "이메일 인증"}
          </button>
        </>
      ) : (
        <p>인증 완료되었습니다.</p>
      )}

      <button type="button" onClick={handleClickPrevPage}>
        이전 페이지
      </button>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default ThirdPage;

const GenderBox = styled.div`
  .innerBox {
    display: inline-flex;
  }

  .inputBox {
    width: 80px;
    height: 50px;
    border: 1px solid #000;
  }

  input {
    position: absolute;
    left: -999999%;
  }
  input:checked + label {
    background: #000;
    color: #fff;
  }
`;
const GenderLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
