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
import { REGISTER_SIGNUP } from "constant/queryKeys";
import useReset from "@libs/client/useReset";

export interface RegisterForm {
  agree?: boolean;
  type: UserType;
  accountId: string;
  password: string;
  passwordConfirm: string;
  email: string;
  token?: string;
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
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
  });
  const { isToken, setIsToken, ResetBtn } = useReset({ setValue });
  const { postApi } = useApi("/api/auth/register");
  const { postApi: checkAccountIdApi } = useApi("/api/auth/register/check/id");
  const { postApi: checkEmailApi } = useApi("/api/auth/register/check/email");
  const { mutate } = useMutation([REGISTER_SIGNUP], postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess() {
      router.replace("/");
    },
  });

  const enterAccountId = watch("accountId");
  const AccountIdRegex = /^[a-zA-Z0-9]*$/;

  const [certifiedComment, setCertifiedComment] = useState("");
  const [isCertified, setIsCertified] = useState(false);
  const enterEmail = watch("email");
  const enterToken = watch("token");
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const isTokenInData = isToken ? { email: enterEmail, token: enterToken, type } : { email: enterEmail, type };

  const handleClickCheckAccountId = async () => {
    const checkIdValidation = enterAccountId && AccountIdRegex.test(enterAccountId);
    if (checkIdValidation) {
      try {
        const data = await checkAccountIdApi({ accountId: enterAccountId });
        setError("accountId", { message: `${data}` });
        setIsNotDuplicate(true);
        alert("사용가능한 아이디입니다");
      } catch (err: any) {
        setError("accountId", { message: `${err.data}` });
      }
    }
  };

  const handleClickNextLevel = () => {
    if (watch("agree")) {
      if (step === 2) {
        const stepTwo =
          isNotDuplicate &&
          watch("password") &&
          watch("passwordConfirm") &&
          watch("password") !== watch("passwordConfirm");
        stepTwo && setStep(3);
      }
      if (router.query.isNew) {
        setStep(3);
      }
      setStep(2);
    }
  };
  const handleClickCheckEmail = async () => {
    const isCorrectEmail = enterEmail && emailRegex.test(enterEmail) && isToken && !enterToken;
    if (!enterEmail) {
      setError("email", { message: "이메일을 입력해주세요" });
    } else if (!emailRegex.test(enterEmail)) {
      setError("email", { message: `이메일 형식에 맞지 않습니다` });
    } else if (isToken && !enterToken) {
      setError("token", { message: "인증번호를 입력해주세요" });
    } else {
      const data = await checkEmailApi(isTokenInData)
        .then(res => {
          if (res?.ok) {
            if (isToken) {
              setCertifiedComment(`${res.data}`);
              setIsCertified(true);
            }
            setIsToken(true);
          }
          setIsToken(true);
        })
        .catch(err => setError("email", { message: `${err.data}` }));
      setError("email", { message: `` });
    }
  };

  const onValid = (data: RegisterForm) => {
    mutate({ ...data, type });
  };

  useEffect(() => {
    clearErrors();
    if (router.query.isNew) {
      console.log(router.query);
      const { id, email, phone, name, birth, gender, type } = router.query;
      setType(type as string);
      console.log(router.query);
      setIsNotDuplicate(true);
      console.log(isNotDuplicate);
      const fakePassword = Math.floor(10000 + Math.random() * 1000000) + "";
      setValue("accountId", id as string);
      setValue("password", fakePassword);
      setValue("passwordConfirm", fakePassword);
      setValue("email", (email as string) || "");
      setValue("phone", (phone as string) || "");
      setValue("name", (name as string) || "");
      setValue("birth", (birth as string) || "");
      setValue("gender", (gender as string) === "male" ? "male" : "female");
    }
  }, [router, isNotDuplicate]);

  useEffect(() => {
    setError("email", { message: `` });
    setIsCertified(false);
  }, [enterEmail]);
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          {step === 1 && (
            <Input
              label="동의"
              name="agree"
              type="checkbox"
              register={register("agree", { required: "약관 동의 해주세요" })}
              errorMessage={errors.agree?.message}
            />
          )}
          {step === 2 && (
            <>
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
            </>
          )}
          {step === 3 && (
            <>
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
                  // pattern: /[0-9\-]/g
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
                })}
                errorMessage={errors.email?.message}
              />
              <ResetBtn />
              {!certifiedComment ? (
                <>
                  {isToken && (
                    <Input
                      name="token"
                      label="인증번호"
                      register={register("token", {
                        required: "인증번호를 입력해주세요.",
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
                <p>{certifiedComment}</p>
              )}
              <button type="submit" disabled={!isCertified}>
                제출
              </button>
            </>
          )}
          {step === 3 || (
            <button type="button" onClick={handleClickNextLevel}>
              다음 단계
            </button>
          )}
        </form>
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
