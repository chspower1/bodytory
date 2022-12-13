import Input from "@components/layout/input/Input";
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
import RadioInput from "@components/layout/input/RadioInput";
import ButtonInInput from "@components/layout/input/ButtonInInput";
import CheckBoxInput from "@components/layout/input/CheckBoxInput";
import { RoundButton } from "@components/layout/buttons/Button";
import { Box, Col, Container, FlexContainer, InnerContainer, Row } from "@styles/Common";
import { theme } from "@styles/theme";
import { Form, FormContents, PrevNextButtonBox } from "./FirstPage";
import { BIRTH_REGEX, EMAIL_REGEX, KR_EN_REGEX, ONLY_KR_REGEX } from "constant/regex";
import { checkEmptyObj } from "@utils/client/checkEmptyObj";
import { createErrors } from "@utils/client/createErrors";
import { useSetRecoilState } from "recoil";
import { Variants, motion } from "framer-motion";
import { checkBirth } from "@utils/client/leapYearCheck";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

interface ThirdRegisterForm {
  email: string;
  token: string;
  gender: Gender;
  name: string;
  birth: string;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}

const FORM_VARIANTS: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const ELEMENT_VARIANTS: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.7,
    },
  },
};
const KoreanName = {
  email: "이메일",
  token: "토큰",
  gender: "성별",
  name: "이름",
  birth: "생일",
};
const ThirdPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  let MINDATE = new Date("1900-01-01 00:00:00");
  let MAXDATE = new Date();

  const { birth, email, gender, name, phone, type } = user!;
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm<ThirdRegisterForm>({ mode: "onChange", defaultValues: { birth, email, gender, name } });
  const [currentComment, setCurrentComment] = useState(
    "마지막 단계에요!\n이용자님의 이름, 생일, 성별, 이메일을 알려주세요",
  );
  // const { isToken, setIsToken, ResetBtn } = useReset({ setValue });
  const [isToken, setIsToken] = useState(false);
  const { postApi: createUser } = customApi("/api/auth/register");
  const { postApi: checkEmailApi } = customApi("/api/auth/register/check/email");
  const isTokenInData = isToken
    ? { email: watch("email"), token: watch("token"), type }
    : { email: watch("email"), type };
  const { mutate } = useMutation([REGISTER_SIGNUP], createUser, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess() {
      router.replace("/auth/register/success");
    },
  });
  const handleClickCheckEmail = async () => {
    try {
      clearErrors(["email", "token"]);
      if (!watch("email")) return setError("email", { message: "앗! 이메일 칸이 비어있어요!" });
      if (watch("email") && !EMAIL_REGEX.test(watch("email")))
        return setError("email", { message: "이메일 형식에 맞지 않습니다" });
      if (isToken && !watch("token")) return setError("token", { message: "인증번호를 입력해주세요" });
      // if (errors.email?.type === "checkCertificate") {
      const data = await checkEmailApi(isTokenInData);
      if (isToken && !watch("token")) {
        return setError("token", { type: "custom", message: "$$$" });
      }
      if (data?.ok && isToken && watch("token")) {
        setUser(prev => ({ ...prev!, isCertified: true }));
        clearErrors();
      }
      setIsToken(true);
      // }
    } catch (err: any) {
      if (isToken) {
        return setError("token", { type: "custom", message: `이메일에서 인증번호 확인 후\n입력해주세요!` });
      }
      setError("email", { type: "custom", message: `중복된 이메일입니다\n다른 이메일을 적어주세요!` });
    }
  };

  const handleClickPrevPage = () => {
    if (user?.type !== "origin") {
      setPage(1);
    } else setPage(2);
  };

  const onValid = (data: ThirdRegisterForm) => {
    if (!isToken) {
      return setError("email", { type: "custom", message: "이메일 인증을 해주세요!" });
    }
    if (user?.isCertified) {
      mutate({ ...user, ...data });
    }
  };

  const isErrorsMessage =
    errors.name?.message ||
    errors.birth?.message ||
    errors.gender?.message ||
    errors.email?.message ||
    errors.token?.message;

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
      setCurrentComment("모든 정보를 입력했어요!\n회원가입 완료를 눌러주세요!");
    }
  }, [watch("name"), watch("birth"), watch("gender"), watch("email"), user?.isCertified]);
  useEffect(() => {
    if (user?.isCertified) {
      setIsToken(true);
    }
    // else setError("email", { type: "checkCertificate", message: "이메일 인증을 완료해주세요!" });
    createErrors<ThirdRegisterForm>({
      user: user!,
      checkList: ["name", "birth", "gender", "email"],
      setError,
      minLength: [2, 8, 0, 0],
      KoreanName,
    });
  }, []);

  useEffect(() => {
    if (isToken) {
      setCurrentComment("이메일에서 인증번호 확인 후\n입력해주세요!");
    } else {
      setCurrentComment("마지막 단계에요!\n이용자님의 이름, 생일, 성별, 이메일을 알려주세요");
    }
  }, [isToken]);

  return (
    <FlexContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          <ThirdPageFormContents variants={FORM_VARIANTS} initial="initial" animate="animate">
            <MessageBox isErrorsMessage={isErrorsMessage} currentComment={currentComment} />
            <motion.div variants={ELEMENT_VARIANTS}>
              <Input
                motion={false}
                name="name"
                placeholder="김토리"
                register={register("name", {
                  required: "이름을 입력해주세요",
                  validate: value => KR_EN_REGEX.test(value) || "이름은 한글,영어 중 입력해주세요",
                  minLength: {
                    value: 2,
                    message: "이름은 두 글자 이상 입력해주세요!",
                  },
                  onChange() {
                    setUser(prev => ({ ...prev!, name: watch("name") }));
                  },
                })}
                error={errors.name?.message}
              />
            </motion.div>
            <motion.div variants={ELEMENT_VARIANTS}>
              <SpaceBetweenRowBox>
                <Input
                  motion={false}
                  width="280px"
                  name="birth"
                  placeholder="YYYYMMDD"
                  register={register("birth", {
                    required: "생일을 입력해주세요",
                    validate: {
                      regexBirth: value => BIRTH_REGEX.test(value) || `생년월일을 올바르게 입력해주세요!`,
                      checkBirth: value => {
                        if (value.length === 10) {
                          let currentDate = new Date(value);
                          if (currentDate <= MINDATE || currentDate >= MAXDATE || !checkBirth(value)) {
                            return `생년월일을 올바르게 입력해주세요`;
                          }
                        }
                      },
                    },
                    minLength: {
                      value: 10,
                      message: "생년월일을 모두 입력해주세요!",
                    },
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
                      required: "성별을 체크해주세요",
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
                      required: "성별을 체크해주세요",
                      onChange() {
                        setUser(prev => ({ ...prev!, gender: watch("gender") }));
                      },
                    })}
                    error={errors.gender?.message}
                  />
                </GenderBox>
              </SpaceBetweenRowBox>
            </motion.div>
            <motion.div variants={ELEMENT_VARIANTS}>
              <ButtonInInput
                name="email"
                disabled={isToken}
                placeholder="bodytory2022@naver.com"
                register={register("email", {
                  required: "앗! 이메일 칸이 비어있어요!",
                  validate: {
                    checkEmailValidate: value => !ONLY_KR_REGEX.test(value) || "이메일 형식에 맞지 않습니다",
                    // checkCertificate: () => user?.isCertified || "이메일 인증을 완료해주세요!",
                  },
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
                error={errors.email?.message}
              />
            </motion.div>
            {!user?.isCertified ? (
              isToken && (
                <CheckTokenBox>
                  <ButtonInInput
                    name="token"
                    placeholder="인증번호"
                    register={register("token", {
                      required: "인증번호를 입력해주세요",
                      validate: { checkToken: value => /^[0-9]+$/.test(value) || "숫자만 입력해주세요" },
                    })}
                    activeFn={handleClickCheckEmail}
                    buttonValue="인증번호 확인"
                    nonSubmit
                    isAuthenticationColumn
                    error={errors.token}
                  />
                </CheckTokenBox>
              )
            ) : (
              <CheckBoxInput label="인증 완료되었습니다" name="completion" checked disabled />
            )}
          </ThirdPageFormContents>
          <PrevNextButtonBox>
            <PreviousButton bgColor="rgb(75, 80, 211)" onClick={handleClickPrevPage}>
              이전 단계
            </PreviousButton>
            <SubmitButton bgColor={theme.color.mintBtn} disable={!checkEmptyObj(errors) || !user?.isCertified}>
              {!isErrorsMessage && user?.isCertified ? "회원가입 완료" : "정보를 모두 입력해주세요"}
            </SubmitButton>
          </PrevNextButtonBox>
        </Form>
      </InnerContainer>
    </FlexContainer>
  );
};

export default ThirdPage;

const PreviousButton = styled(RoundedDefaultButton)`
  width: 160px;
  height: 60px;
  font-size: 18px;
`;

const SubmitButton = styled(RoundedDefaultButton)`
  width: 360px;
  height: 60px;
  font-size: 18px;
`;

const GenderBox = styled(Box)`
  gap: 26px;
  width: 220px;
  justify-content: flex-end;
`;

const ThirdPageFormContents = styled(FormContents)`
  > div + div {
    margin-top: 30px;
  }
`;

const SpaceBetweenRowBox = styled(Row)`
  width: 500px;
  margin: 0 auto;
`;

const CheckTokenBox = styled.div`
  margin-top: 30px;
`;
