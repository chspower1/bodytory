import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import customApi from "utils/client/customApi";
import { Gender } from "@prisma/client";
import styled from "styled-components";
import useReset from "@hooks/useReset";
import { useMutation } from "@tanstack/react-query";
import { REGISTER_SIGNUP } from "constant/queryKeys";
import { useRouter } from "next/router";
import MessageBox from "@components/MessageBox";
import RadioInput from "@components/radioInput";
import ButtonInInput from "@components/ButtonInInput";
import CheckBoxInput from "@components/CheckBoxInput";
import { RoundButton } from "@components/button/Button";
import { Box } from "@styles/Common";

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
  const [currentComment, setCurrentComment] = useState("");
  // const { isToken, setIsToken, ResetBtn } = useReset({ setValue });
  const [isToken, setIsToken] = useState(false);
  const { postApi: createUser } = customApi("/api/auth/register");
  const { postApi: checkEmailApi } = customApi("/api/auth/register/check/email");
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const isTokenInData = { email: watch("email"), token: isToken ? watch("token") : undefined, type };
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
      if (!watch("email")) return setError("email", { message: "앗! 이메일 인증을 완료해주세요" });
      if(watch("email") && !emailRegex.test(watch("email"))) return setError("email", { message: "이메일 형식에 맞지 않습니다" });
      if (isToken && !watch("token")) return setError("token", { message: "인증번호를 입력해주세요" });
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
      console.log(err);
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

  const errorMessageText = () => {
    const isErrorsMessage =
      errors.name?.message ||
      errors.birth?.message ||
      errors.gender?.message ||
      errors.email?.message ||
      errors.token?.message;
    if (!isErrorsMessage) {
      if (currentComment.includes("\n")) {
        return currentComment.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{currentComment}</p>;
      }
    } else {
      if (isErrorsMessage.includes("\n")) {
        return isErrorsMessage.split("\n").map(ele => <p key={ele}>{ele}</p>);
      } else {
        return <p>{isErrorsMessage}</p>;
      }
    }
  };

  useEffect(() => {
    if (!watch("name") || !watch("birth") || !watch("gender") || !watch("email")) {
      setCurrentComment("마지막 단계에요!\n이용자님의 이름, 생일, 성별, 이메일을 알려주세요");
    } else if (
      watch("name") &&
      watch("birth").length === 10 &&
      watch("gender") &&
      watch("email") &&
      user?.isCertified
    ) {
      setCurrentComment("회원가입 완료를 눌러주세요!");
    }
  }, [watch("name"), watch("birth"), watch("gender"), watch("email"), user?.isCertified]);
  useEffect(()=>{
    if(user?.isCertified){
      setIsToken(true);
    }
  },[])
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <MessageBox>{errorMessageText()}</MessageBox>
      <Input
        name="name"
        placeholder="김토리"
        register={register("name", {
          required: "이름을 입력해주세요",
          validate: value => /^[가-힣a-zA-Z]+$/.test(value) || "한글과 영어만 입력해주세요",
          onChange() {
            setUser(prev => ({ ...prev!, name: watch("name") }));
          },
        })}
        error={errors.name?.message}
      />
      <Input
        name="birth"
        placeholder="YYYY-MM-DD"
        register={register("birth", {
          required: "생일을 입력해주세요",
          // validate: value => /[^0-9]/g.test(value) || `숫자만 입력해주세요`,
          onChange() {
            setValue(
              "birth",
              watch("birth")
                .replace(/[^0-9]/g, "")
                .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
                .replace(/(\-{1,2})$/g, ""),
            );
            setUser(prev => ({ ...prev!, birth: watch("birth") }));
          },
        })}
        maxLength={10}
        error={errors.birth?.message}
      />
      <GenderBox>
        <RadioInput
          name="registerGenderMale"
          value="male"
          label="남자"
          register={register("gender", {
            required: "성별을 선택해주세요",
            onChange() {
              setUser(prev => ({ ...prev!, gender: watch("gender") }));
            },
          })}
          error={errors.gender?.message}
        />
        <RadioInput
          name="registerGenderFeMale"
          value="female"
          label="여자"
          register={register("gender", {
            required: "성별을 선택해주세요",
            onChange() {
              setUser(prev => ({ ...prev!, gender: watch("gender") }));
            },
          })}
          error={errors.gender?.message}
        />
      </GenderBox>
      <ButtonInInput
        name="email"
        disabled={isToken}
        placeholder="toritori2022@naver.com"
        register={register("email", {
          required: "이메일을 입력해주세요",
          validate: value => emailRegex.test(value) || "이메일 형식에 맞지 않습니다",
          onChange() {
            setUser(prev => ({ ...prev!, email: watch("email") }));
          },
        })}
        activeFn={handleClickCheckEmail}
        buttonValue="인증메일 전송"
        nonSubmit
        setValue={setValue}
        changeButtonValue="메일"
        isToken={isToken}
        setIsToken={setIsToken}
        isCertified={user?.isCertified}
      />
      {!user?.isCertified ? (
        isToken && (
          <ButtonInInput
            name="token"
            placeholder="인증번호"
            register={register("token", {
              required: "인증번호를 입력해주세요.",
              validate: value => /^[0-9]+$/.test(value) || "숫자만 입력해주세요",
            })}
            activeFn={handleClickCheckEmail}
            buttonValue="인증번호 확인"
            nonSubmit
            isAuthenticationColumn
          />
        )
      ) : (
        <CheckBoxInput label="인증 완료되었습니다" name="completion" checked />
      )}

      <Box>
        <RoundButton nonSubmit size="md" onClick={handleClickPrevPage}>
          이전 페이지
        </RoundButton>
        <RoundButton size="lg" disable={!currentComment.includes("회원가입")}>
          {currentComment.includes("회원가입") ? "회원가입 완료" : "정보를 모두 입력해주세요"}
        </RoundButton>
      </Box>
    </form>
  );
};

export default ThirdPage;

const GenderBox = styled.div`
  display: inline-flex;
`;
