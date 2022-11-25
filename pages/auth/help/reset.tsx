import Input from "@components/Input";

import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponseType } from "@utils/server/withHandler";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { HELP_FIND_PASSWORD } from "constant/queryKeys";
import { RoundButton } from "@components/button/Button";
import { PASSWORD_REGEX } from "constant/regex";
import MessageBox from "@components/MessageBox";
import { FinalCommentBox } from "./find-id";
import { theme } from "@styles/theme";
import { checkEmptyObj } from "@utils/client/checkEmptyObj";
import styled from "styled-components";
import { FlexContainer, InnerContainer } from "@styles/Common";

interface ResetForm {
  password: string;
  passwordConfirm: string;
}

const Reset: NextPage = () => {
  const router = useRouter();
  const { putApi } = customApi("/api/auth/help/reset");
  const [currentComment, setCurrentComment] = useState("인증이 완료되었어요\n새로운 비밀번호를 설정해주세요");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutateAsync } = useMutation([HELP_FIND_PASSWORD], putApi, {
    onSuccess(data) {
      setIsSuccess(true);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ResetForm>({ mode: "onChange" });

  const onValid = (resetForm: ResetForm) => {
    console.log(resetForm);
    mutateAsync({ accountId: router.query.accountId, password: resetForm.password });
  };

  const checkPassword = () => {
    if (watch("password") === watch("passwordConfirm")) {
      setCurrentComment("완료 버튼을 눌러주세요!");
      clearErrors(["password", "passwordConfirm"]);
    } else return "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요";
  };

  const isErrorsMessage = errors.password?.message || errors.passwordConfirm?.message;

  useEffect(() => {
    console.log(router.query);
    if (router.asPath !== "/auth/help/reset" || !router.query.accountId) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <Container>
      <InnerContainer>
        {!isSuccess ? (
          <>
            <MessageBox isErrorsMessage={isErrorsMessage} currentComment={currentComment} />
            <form onSubmit={handleSubmit(onValid)}>
              <Seperation>
                <Input
                  name="password"
                  type="password"
                  placeholder="●●●●●●"
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
                      } else {
                        if (watch("password") !== watch("passwordConfirm") && watch("passwordConfirm")) {
                          setError("passwordConfirm", {
                            message: "비밀번호가 일치하지 않아요!\n비밀번호를 다시 확인해주세요",
                          });
                        } else {
                          setCurrentComment("비밀번호를 한번 더 입력해주세요");
                          clearErrors(["password", "passwordConfirm"]);
                        }
                      }
                    },
                  })}
                  error={errors.password?.message}
                />
              </Seperation>
              {PASSWORD_REGEX.test(watch("password")) && (
                <>
                  <Seperation>
                    <Input
                      name="passwordConfirm"
                      placeholder="●●●●●●"
                      register={register("passwordConfirm", {
                        required: true,
                        validate: {
                          checkPassword,
                        },
                      })}
                      error={errors.passwordConfirm?.message}
                    />
                  </Seperation>
                  <Seperation>
                    <RoundButton
                      size="lg"
                      bgColor={theme.color.mintBtn}
                      disable={!checkEmptyObj(errors) || !watch("password") || !watch("passwordConfirm")}
                    >
                      비밀번호 재설정 완료
                    </RoundButton>
                  </Seperation>
                </>
              )}
            </form>
          </>
        ) : (
          <FinalCommentBox>
            <div className="innerBox">
              <MessageBox>
                <p>비밀번호가 재설정이 완료되었어요! </p>
                <p>새로운 비밀번호로 로그인해주세요</p>
              </MessageBox>
              <div className="linkButton">
                <Link href="/auth/login">
                  <RoundButton size="lg" bgColor={theme.color.mintBtn} onClick={() => router.push("/auth/login")}>
                    로그인하러 가기
                  </RoundButton>
                </Link>
              </div>
            </div>
          </FinalCommentBox>
        )}
      </InnerContainer>
    </Container>
  );
};
export default Reset;

const Container = styled(FlexContainer)``;

const Seperation = styled.div`
  & + & {
    margin-top: 30px;
  }
`;
