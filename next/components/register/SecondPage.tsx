import Input from "@components/layout/input/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import customApi from "utils/client/customApi";
import { CircleButton, RoundButton } from "@components/layout/buttons/Button";
import { Box, Col, Container, FlexContainer, InnerContainer, Row } from "@styles/Common";
import MessageBox from "@components/MessageBox";
import { ACCOUNT_ID_REGEX, PASSWORD_REGEX } from "constant/regex";
import { PrevNextButtonBox, Form, FormContents } from "./FirstPage";
import { theme } from "@styles/theme";
import { checkEmptyObj } from "@utils/client/checkEmptyObj";
import { createErrors } from "@utils/client/createErrors";
import styled from "styled-components";
import { LoginInputAreaBox } from "pages/auth/login";
import { AnimatePresence } from "framer-motion";

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
    reset,
  } = useForm<SecondRegisterForm>({
    mode: "all",
    defaultValues: {
      accountId: user?.accountId,
      password: user?.password,
      passwordConfirm: user?.passwordConfirm,
    },
  });
  const [currentInputIdx, setCurrentInputIdx] = useState(1);
  const [currentComment, setCurrentComment] = useState("");
  const { postApi: checkAccountIdApi } = customApi("/api/auth/register/check/id");

  const onValid = (data: SecondRegisterForm) => {
    if (user?.isNotDuplicate) {
      if (watch("password") !== watch("passwordConfirm")) {
        return setError("passwordConfirm", { message: "비밀번호가 일치하지 않아요" });
      }
      setUser(prev => ({ ...prev!, ...data }));
      setPage(3);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      if (!watch("accountId")) return setError("accountId", { message: "사용하실 아이디를 입력해주세요" });
      if (!ACCOUNT_ID_REGEX.test(watch("accountId"))) return;
      await checkAccountIdApi({ accountId: watch("accountId") });
      setUser(prev => ({ ...prev!, isNotDuplicate: true }));
      clearErrors("accountId");
      setCurrentInputIdx(2);
    } catch (err: any) {
      setError("accountId", { message: `이미 사용 중인 아이디에요!\n다른아이디를 입력해주세요` });
    }
  };

  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요";
  };

  const isErrorsMessage = errors.accountId?.message || errors.password?.message || errors.passwordConfirm?.message;

  // firstPage로 갈 시 2페이지 모든 폼 리셋
  const pageReset = () => {
    setPage(1);
    setCurrentInputIdx(1);
    reset();
  };

  useEffect(() => {
    if (!watch("accountId")) {
      setCurrentComment("사용하실 아이디를 입력해주세요");
    } else if (watch("accountId").length >= 6 && !user?.isNotDuplicate && ACCOUNT_ID_REGEX.test(watch("accountId"))) {
      setCurrentComment("중복확인을 눌러주세요!");
    } else if (!watch("password")) {
      setCurrentComment("사용하실 비밀번호를 입력해주세요");
    } else if (!watch("passwordConfirm")) {
      setCurrentComment("비밀번호를 한번 더 입력해주세요");
    } else {
      setCurrentInputIdx(4);
      setCurrentComment("다음 단계로 넘어가주세요!");
    }
  }, [watch, watch(), user?.isNotDuplicate]);

  return (
    <FlexContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          <FormContents>
            <MessageBox isErrorsMessage={isErrorsMessage} currentComment={currentComment} />
            <LoginInputAreaBox>
              <Input
                name="accountId"
                placeholder="bodytory2022"
                register={register("accountId", {
                  required: true,
                  validate: {
                    checkAccountId: value => ACCOUNT_ID_REGEX.test(value) || "아이디는 6글자이상으로 입력해주세요",
                  },
                  onChange() {
                    setUser(prev => ({ ...prev!, isNotDuplicate: false }));
                    setCurrentInputIdx(1);
                    setValue("password", "");
                    setValue("passwordConfirm", "");
                  },
                })}
                error={errors.accountId}
              />

              {(!user?.isNotDuplicate || !watch("accountId")) && (
                <ButtonBox>
                  <RoundButton
                    nonSubmit
                    size="sm"
                    bgColor={
                      errors.accountId?.message?.includes("다른아이디") ? theme.color.error : theme.color.mintBtn
                    }
                    disable={Boolean(!currentComment.includes("중복확인"))}
                    onClick={handleClickCheckAccountId}
                  >
                    중복확인
                  </RoundButton>
                </ButtonBox>
              )}

              <AnimatePresence>
                {currentInputIdx >= 2 && (
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••"
                    register={register("password", {
                      required: true,
                      validate: {
                        regexPassword: value =>
                          PASSWORD_REGEX.test(value) ||
                          "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 조합해서 입력해주세요",
                      },
                      onChange() {
                        if (watch("password").length < 6) {
                          setValue("passwordConfirm", "");
                          setCurrentInputIdx(2);
                        } else {
                          setCurrentInputIdx(3);
                          if (watch("password") !== watch("passwordConfirm") && watch("passwordConfirm")) {
                            setError("passwordConfirm", {
                              message: "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요",
                            });
                          } else {
                            clearErrors(["password", "passwordConfirm"]);
                          }
                        }
                      },
                    })}
                    error={errors.password}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {currentInputIdx >= 3 && !errors.password?.message && (
                  <Input
                    type="password"
                    name="passwordConfirm"
                    placeholder="••••••"
                    register={register("passwordConfirm", {
                      required: true,
                      validate: {
                        checkPassword,
                      },
                    })}
                    error={errors.passwordConfirm}
                  />
                )}
              </AnimatePresence>
            </LoginInputAreaBox>
          </FormContents>
          <PrevNextButtonBox>
            <CircleButton
              nonSubmit
              bgColor="rgb(75, 80, 211)"
              onClick={() => {
                pageReset();
              }}
            >
              이전 단계
            </CircleButton>
            <CircleButton
              bgColor={theme.color.mintBtn}
              disable={/* !checkEmptyObj(error) */ currentInputIdx !== 4 || Boolean(isErrorsMessage)}
            >
              다음 단계
            </CircleButton>
          </PrevNextButtonBox>
        </Form>
      </InnerContainer>
    </FlexContainer>
  );
};

export default SecondPage;

const ButtonBox = styled(Row)`
  margin-top: 80px;
`;
