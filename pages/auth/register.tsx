import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Gender, UserType } from "@prisma/client";

interface FirstRegisterForm {
  agree: boolean;
}
interface SecondRegisterForm {
  accountId: string;
  password: string;
  passwordConfirm: string;
}
interface ThirdRegisterForm {
  email: string;
  gender: string;
  name: string;
  birth: string;
  phone?: string;
}
export interface RegisterForm {
  type: UserType;
  accountId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  gender: Gender;
  name: string;
  birth: string;
  phone?: string;
}

function RegisterPage() {
  const router = useRouter();
  const [type, setType] = useState("origin");
  const [step, setStep] = useState(1);
  const [isNotDuplicate, setIsNotDuplicate] = useState(false);
  const {
    register: firstRegister,
    handleSubmit: firstHandleSubmit,
    setError: firstSetError,
    watch: firstWatch,
    clearErrors: firstClearErrors,
    setValue: firstSetValue,
    formState: { errors: firstErrors },
  } = useForm<FirstRegisterForm>();
  const {
    register: secondRegister,
    handleSubmit: secondHandleSubmit,
    setError: secondSetError,
    watch: secondWatch,
    clearErrors: secondClearErrors,
    setValue: secondSetValue,
    formState: { errors: secondErrors },
  } = useForm<SecondRegisterForm>();
  const {
    register: thirdRegister,
    handleSubmit: thirdHandleSubmit,
    setError: thirdSetError,
    watch: thirdWatch,
    clearErrors: thirdClearErrors,
    setValue: thirdSetValue,
    formState: { errors: thirdErrors },
  } = useForm<ThirdRegisterForm>();
  const { postApi } = useApi("/api/auth/register");
  const { mutate } = useMutation(postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess() {
      router.replace("/");
    },
  });
  const clearErrors = () => {
    firstClearErrors();
    secondClearErrors();
    thirdClearErrors();
  };
  async function firstOnValid(data: FirstRegisterForm) {
    const { agree } = data;

    if (agree) {
      setStep(2);
    }
  }
  async function secondOnValid(data: SecondRegisterForm) {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      secondSetError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다" });
      return;
    } else setStep(3);
  }
  async function thirdOnValid(data: ThirdRegisterForm) {
    console.log({ ...firstWatch(), ...secondWatch(), ...thirdWatch() });
    mutate({ ...firstWatch(), ...secondWatch(), ...thirdWatch(), type });
  }
  const enterAccountId = secondWatch("accountId");
  const regex = /^[a-zA-Z0-9]*$/;
  const { postApi: checkAccountIdApi } = useApi("/api/auth/register/check");
  const handleClickCheckAccountId = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (enterAccountId === "") {
      secondSetError("accountId", { message: "아이디를 입력해주세요" });
    } else if (!regex.test(enterAccountId)) {
      secondSetError("accountId", { message: `아이디 형식에 맞지 않습니다` });
    } else {
      checkAccountIdApi({ accountId: enterAccountId })
        .then(res => {
          secondSetError("accountId", { message: `${res}` });
          setIsNotDuplicate(true);
          alert("사용가능한 아이디");
        })
        .catch(err => secondSetError("accountId", { message: `${err.data}` }));
    }
  };
  useEffect(() => {
    if (isNotDuplicate) {
      setIsNotDuplicate(false);
    }
  }, [enterAccountId]);
  // 소셜 계정 가입 시
  useEffect(() => {
    clearErrors();
    if (router.query.type) {
      console.log(router.query);
      const { id, email, phone, name, birth, gender, type } = router.query;
      setType(type as string);
      console.log(router.query);
      setIsNotDuplicate(true);
      console.log(isNotDuplicate);
      const fakePassword = Math.floor(10000 + Math.random() * 1000000) + "";
      secondSetValue("accountId", id as string);
      secondSetValue("password", fakePassword);
      secondSetValue("passwordConfirm", fakePassword);
      thirdSetValue("email", (email as string) || "");
      thirdSetValue("phone", (phone as string) || "");
      thirdSetValue("name", (name as string) || "");
      thirdSetValue("birth", (birth as string) || "");
      thirdSetValue("gender", (gender as string) === "male" ? "male" : "female");
    }
  }, [router, isNotDuplicate]);
  return (
    <>
      <div>
        {step == 1 && (
          <form onSubmit={firstHandleSubmit(firstOnValid)}>
            <Input
              label="동의"
              name="agree"
              type="checkbox"
              register={firstRegister("agree", { required: "약관 동의 해주세요" })}
              errorMessage={firstErrors.agree?.message}
            />
            <button type="submit" disabled={firstErrors.agree !== undefined}>
              제출
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={secondHandleSubmit(secondOnValid)}>
            <Input
              label="아이디"
              name="accountId"
              placeholder="아이디를 입력해주세요"
              register={secondRegister("accountId", { required: "아이디를 입력해주세요" })}
              errorMessage={secondErrors.accountId?.message}
            />
            <button onClick={handleClickCheckAccountId}>중복확인</button>

            <Input
              type="password"
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              register={secondRegister("password", { required: "비밀번호를 입력해주세요" })}
              errorMessage={secondErrors.password?.message}
            />
            <Input
              type="password"
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="한번 더 입력해주세요"
              register={secondRegister("passwordConfirm", { required: "비밀번호 확인을 입력해주세요" })}
              errorMessage={secondErrors.passwordConfirm?.message}
            />
            <button type="submit" disabled={!isNotDuplicate}>
              제출
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={thirdHandleSubmit(thirdOnValid)}>
            <Input
              label="이름"
              name="name"
              register={thirdRegister("name", { required: "이름을 입력해주세요" })}
              errorMessage={thirdErrors.name?.message}
            />
            <Input
              label="생일"
              name="birth"
              register={thirdRegister("birth", {
                required: "생일을 입력해주세요",
                // pattern: /[0-9\-]/g
              })}
              errorMessage={thirdErrors.birth?.message}
            />
            <GenderBox>
              <h4>성별</h4>
              <div className="innerBox">
                <div className="inputBox">
                  <input
                    id="registerGenderMale"
                    type="radio"
                    value={"male"}
                    {...thirdRegister("gender", { required: "성별을 선택해주세요" })}
                  />
                  <GenderLabel htmlFor="registerGenderMale">남자</GenderLabel>
                </div>
                <div className="inputBox">
                  <input
                    id="registerGenderFeMale"
                    type="radio"
                    value={"female"}
                    {...thirdRegister("gender", { required: "성별을 선택해주세요" })}
                  />
                  <GenderLabel htmlFor="registerGenderFeMale">여자</GenderLabel>
                </div>
              </div>
              <p>{thirdErrors.gender?.message}</p>
            </GenderBox>
            <button type="submit" disabled={!isNotDuplicate}>
              제출
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default RegisterPage;
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
