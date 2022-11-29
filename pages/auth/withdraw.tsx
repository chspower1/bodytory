import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import customApi from "utils/client/customApi";
import { USER_WITHDRAW } from "constant/queryKeys";
import { useRecoilState } from "recoil";
import { loggedInUser } from "atoms/atoms";
import Modal from "@components/Modal/Modal";

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
  const handleClickActiveFuction = async() => {
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
    userType === "origin" ? setIsOrigin(true) : setIsOrigin(false)
  }, [])
  
  return (
    <div>
      <h3>회원 탈퇴</h3>
      <form onSubmit={handleSubmit(onValid)}>
        <div>
          <p>{isOrigin ? `비밀번호를 입력하고 확인을` : `탈퇴하기를`} 누르시면</p>
          <p>탈퇴가 진행 됩니다</p>
        </div>
        {isOrigin && (
          <>
            <p>
              <input type="text" {...register("password", { required: "필수값입니다" })} />
            </p>
            <p>{errors.password && errors.password.message}</p>
          </>
        )}
        <button type="submit">탈퇴하기</button>
      </form>
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
    </div>
  );
}
