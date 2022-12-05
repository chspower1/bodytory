import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import customApi from "utils/client/customApi";
import { USER_WITHDRAW } from "constant/queryKeys";
import { useRecoilState } from "recoil";
import { loggedInUser } from "atoms/atoms";
import Modal from "@components/modals/Modal";
import { FlexContainer, InnerContainer } from "@styles/Common";
import MessageBox from "@components/MessageBox";
import Input from "@components/Input";
import { RectangleButton } from "@components/buttons/Button";
import styled from "styled-components";
import HospitalModalInner from "@components/hospitals/HospitalModalInner";
import { PASSWORD_REGEX } from "constant/regex";
import Header from "@components/header/Header";

export interface WithdrawType {
  password: string;
}

export default function Withdraw() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(loggedInUser);
  const [isOrigin, setIsOrigin] = useState<boolean>();
  const userType = currentUser?.type;
  const [showModal, setShowModal] = useState(false);
  const [closingComment, setClosingComment] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { deleteApi } = customApi("/api/auth/withdraw");
  const { deleteApi: LogoutApi } = customApi("/api/auth/logout");
  const { mutate } = useMutation([USER_WITHDRAW], deleteApi, {
    onError(error: any, variables, context) {
      setShowModal(false);
      console.log(error);

      setError("password", { message: `${error.data}` });
    },
    onSuccess: data => {
      setClosingComment(true);
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
  } = useForm<WithdrawType>({ mode: "onChange" });

  const onValid: SubmitHandler<WithdrawType> = ({ password }) => {
    setCurrentPassword(password);
    setShowModal(true);
  };
  const handleClickOnClose = () => {
    setShowModal(false);
  };
  const handleClickActiveFuction = async () => {
    if (!closingComment) {
      mutate({ password: currentPassword, type: userType });
    } else {
      setShowModal(false);
      const logout = await LogoutApi({});
      router.replace("/");
      setCurrentUser(null);
    }
  };
  useEffect(() => {
    userType === "origin" ? setIsOrigin(true) : setIsOrigin(false);
  }, []);

  const isErrorsMessage = errors.password?.message;

  return (
    <FlexContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <MessageBox
          isErrorsMessage={isErrorsMessage}
          currentComment={`${isOrigin ? `비밀번호를 입력하고 확인을` : `탈퇴하기를`} 누르시면\n회원탈퇴가 진행 됩니다`}
        ></MessageBox>
        {isOrigin && (
          <Input
            $light
            type="password"
            register={register("password", {
              required: "회원탈퇴를 하시려면\n비밀번호로 인증 해주셔야해요",
              validate: {
                regexPassword: value =>
                  PASSWORD_REGEX.test(value) || "비밀번호는 6자리 이상\n영문 대소문자, 숫자를 조합해서 입력해주세요",
              },
            })}
            placeholder="●●●●●●"
            error={errors.password}
          />
        )}
        <ButtonBox>
          <RectangleButton>탈퇴하기</RectangleButton>
        </ButtonBox>
      </Form>
      <Modal
        onClose={handleClickOnClose}
        activeFuction={handleClickActiveFuction}
        show={showModal}
        closingComment={closingComment}
      >
        {!closingComment ? (
          <>회원탈퇴를 하시겠습니까?</>
        ) : (
          <>
            회원탈퇴가 성공적으로 완료되었습니다
            <br />
            홈으로 이동합니다
          </>
        )}
      </Modal>
    </FlexContainer>
  );
}

const Form = styled.form`
  .messageBox {
    color: #232323;
    margin-bottom: 100px;
    font-size: 40px;
  }
`;

const ButtonBox = styled.div`
  margin-top: 50px;
  button {
    margin: 0 auto;
  }
`;
