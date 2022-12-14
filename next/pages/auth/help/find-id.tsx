import Input from "@components/layout/input/Input";

import { GetServerSidePropsContext, NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { HelpForm } from "./find-pw";
import { HELP_FIND_ID } from "constant/queryKeys";

import { media, theme } from "@styles/theme";
import { EMAIL_REGEX } from "constant/regex";
import ButtonInInput from "@components/layout/input/ButtonInInput";
import MessageBox from "@components/MessageBox";
import styled from "styled-components";
import { FlexContainer, InnerContainer, Row } from "@styles/Common";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";

const HelpFindId: NextPage = () => {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/help/find-id");
  const [currentComment, setCurrentComment] = useState("아이디를 잊으셨나요?\n가입 시 입력한 이메일을 알려주세요");
  const [foundAccountId, setFoundAccountId] = useState("");
  const { mutate } = useMutation([HELP_FIND_ID], postApi, {
    onError(error: any) {
      if (isToken) {
        return setError("token", { message: `${error.data}` });
      }
      setError("email", { message: `가입된 이메일이 없어요\n다시 한번 확인해주세요` });
    },
    onSuccess(data) {
      if (isToken) {
        if (data.data) {
          return setFoundAccountId(`${data.data}`);
        }
        setValue("token", "");
        clearErrors();
        return setCurrentComment("입력하신 이메일로 한번 더 보냈어요!\n인증번호를 확인해주세요");
      }
      setIsToken(true);
      clearErrors();
      setCurrentComment("입력하신 이메일로 인증메일을 보냈어요!\n인증번호를 확인해주세요");
    },
  });
  const {
    register: helpRegister,
    handleSubmit: helpHandleSubmit,
    setValue,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors: helpErrors },
  } = useForm<HelpForm>({ mode: "onChange" });
  const [isToken, setIsToken] = useState(false);
  const onValidHelpForm = (helpForm: HelpForm) => {
    mutate(helpForm);
  };
  const handleClickFindId = () => {
    if (!watch("email")) return setError("email", { message: "이메일을 입력해주세요" });
    if (watch("email") && !EMAIL_REGEX.test(watch("email")!)) {
      return setError("email", { message: "이메일 형식에 맞지 않습니다" });
    }
    mutate({ email: watch("email") });
  };

  const isErrorsMessage = helpErrors.email?.message || helpErrors.token?.message;

  useEffect(() => {
    if (!isToken) {
      setCurrentComment("아이디를 잊으셨나요?\n가입 시 입력한 이메일을 알려주세요");
    }
  }, [isToken]);

  return (
    <FlexContainer>
      <InnerContainer>
        {!foundAccountId ? (
          <>
            <MessageBox isErrorsMessage={isErrorsMessage} currentComment={currentComment} />
            <FindForm onSubmit={helpHandleSubmit(onValidHelpForm)}>
              {isToken || (
                <Seperation>
                  <Input
                    name="email"
                    register={helpRegister("email", {
                      required: true,
                      validate: value => EMAIL_REGEX.test(value!) || "이메일 형식에 맞지 않습니다",
                    })}
                    placeholder="bodytory2022@naver.com"
                    error={helpErrors.email}
                  />
                </Seperation>
              )}
              <Seperation>
                <RoundedDefaultButton lg type="button" onClick={handleClickFindId}>
                  {isToken ? "인증메일 다시 보내기" : "아이디 찾기"}
                </RoundedDefaultButton>
              </Seperation>
              {isToken && (
                <Seperation>
                  <ButtonInInput
                    name="token"
                    placeholder="인증번호"
                    register={helpRegister("token", {
                      required: "인증번호를 입력해주세요",
                      validate: value => /^[0-9]+$/.test(value!) || "숫자만 입력해주세요",
                    })}
                    buttonValue="인증번호 확인"
                    isAuthenticationColumn
                    error={helpErrors.token}
                  />
                </Seperation>
              )}
            </FindForm>
          </>
        ) : (
          <FinalCommentBox>
            <div className="innerBox">
              <MessageBox>
                <p>
                  이용자님의 아이디는 <strong>{foundAccountId}</strong> 입니다.
                </p>
              </MessageBox>
              <div className="linkButton">
                <RoundedDefaultButton lg bgColor={theme.color.mintBtn} onClick={()=> router.push("/auth/login")}>
                  로그인하러 가기
                </RoundedDefaultButton>
              </div>
            </div>
          </FinalCommentBox>
        )}
      </InnerContainer>
    </FlexContainer>
  );
};
export default HelpFindId;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
export const FindForm = styled.form`
  margin-top: 100px;
  ${media.mobile}{
    margin-top: 50px;
  }
`;

export const Seperation = styled(Row)`
  & + & {
    padding-top: 30px;

    > button,
    > div {
      margin-top: 30px;
    }
    ${media.mobile}{
      > button,
      > div {
        margin-top: 20px;
      }
    }
  }
`;

export const FinalCommentBox = styled.div`
  display: flex;
  justify-content: center;
  .innerBox {
    .messageBox {
      font-size: 36px;
      color: #fff;
      margin-bottom: 80px;
      strong {
        border-bottom: 2px solid #fff;
        margin: 0 30px;
      }
    }
    .linkButton {
      display: flex;
      justify-content: center;
    }
  }
  ${media.mobile}{
    .innerBox {
      .messageBox {
        font-size: 20px;
        height:136px;
        margin-bottom: 80px;
        strong {
          margin: 0 10px;
        }
      }
    }
  }
`;
  