import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useApi from "@libs/client/useApi";
import Modal from "@components/Modal";
import useUser from "@libs/client/useUser";
export interface WithdrawType {
  password: string;
}

export default function Withdraw() {
  const router = useRouter();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [closingComment, setClosingComment] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const { deleteApi } = useApi("/api/auth/withdraw");
  const { deleteApi: LogoutApi } = useApi("/api/auth/logout");
  const { mutate } = useMutation(["withdrawKey"], deleteApi, {
    onError(error: any, variables, context) {
      setShowModal(false);
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
    formState: { errors },
  } = useForm<WithdrawType>();

  const onValid: SubmitHandler<WithdrawType> = ({ password }) => {
    setCurrentPassword(password);
    setShowModal(true);
  };
  const handleClickOnClose = () => {
    setShowModal(false);
  };
  const handleClickActiveFuction = () => {
    if (!closingComment) {
      mutate({ password: currentPassword });
    } else {
      setShowModal(false);
      LogoutApi({}).then(res => router.replace("/"));
    }
  };
  return (
    <div>
      <h3>회원 탈퇴</h3>
      <form onSubmit={handleSubmit(onValid)}>
        <h4>
          비밀번호를 입력하고 확인을 누르시면
          <br />
          탈퇴가 진행 됩니다.
        </h4>
        <p>
          <input type="text" {...register("password", { required: "필수값입니다" })} />
        </p>
        <p>{errors.password && errors.password.message}</p>
        <button type="submit">탈퇴하기</button>
      </form>
      <Modal
        onClose={handleClickOnClose}
        activeFuction={handleClickActiveFuction}
        show={showModal}
        closingComment={closingComment}
        title={"시스템"}
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
      {/* {isModal && (
        <div>
          <h3>삭제완료!</h3>
          <p>이제 아프지 말고 다신 보지 맙시다~!</p>
          <button onClick={handleClickConfirm}>확인</button>
        </div>
      )} */}
    </div>
  );
}
