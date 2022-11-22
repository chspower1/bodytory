import Input from "@components/Input";
import Modal from "@components/Modal";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { USER_CHANGE_PASSWORD } from "constant/queryKeys";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface PasswordType {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function Edit() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [closingComment, setClosingComment] = useState(false);
  const [{ oldPassword, newPassword }, setChangePassword] = useState({ oldPassword: "", newPassword: "" });
  const { putApi } = customApi("/api/users/edit");
  const { mutate } = useMutation([USER_CHANGE_PASSWORD], putApi, {
    onError(error: any) {
      setShowModal(false);
      setError("oldPassword", { message: `${error.data}` });
    },
    onSuccess() {
      setClosingComment(true);
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordType>();
  const onValid: SubmitHandler<PasswordType> = ({ oldPassword, newPassword, newPasswordConfirm }) => {
    if (newPassword !== newPasswordConfirm) {
      setError("newPasswordConfirm", { message: "비밀번호가 일치하지 않습니다" });
    } else if (oldPassword === newPassword) {
      setError("newPassword", { message: "새로운 비밀번호를 입력해주세요" });
    } else {
      setChangePassword({ oldPassword, newPassword });
      setShowModal(true);
    }
  };
  const handleClickOnClose = () => {
    setShowModal(false);
  };
  const handleClickActiveFuction = () => {
    if (!closingComment) {
      mutate({ password: oldPassword, newPassword });
    } else {
      setShowModal(false);
      router.replace("/");
    }
  };
  return (
    <div>
      <h3>비밀번호 변경테스트</h3>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="oldPassword"
          label="현재 비밀번호"
          type="text"
          register={register("oldPassword", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.oldPassword?.message}
        />
        <Input
          name="newPassword"
          label="새 비밀번호"
          type="text"
          register={register("newPassword", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPassword?.message}
        />
        <Input
          name="newPasswordConfirm"
          label="새 비밀번호 확인"
          type="text"
          register={register("newPasswordConfirm", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPasswordConfirm?.message}
        />
        <button type="submit">제출</button>
      </form>
      <Modal
        onClose={handleClickOnClose}
        activeFuction={handleClickActiveFuction}
        show={showModal}
        closingComment={closingComment}
        title={"시스템"}
      >
        {!closingComment ? (
          <>비밀번호를 변경하시겠습니까?</>
        ) : (
          <>
            변경이 성공적으로 완료되었습니다
            <br />
            홈으로 이동합니다
          </>
        )}
      </Modal>
      <Link href="/auth/withdraw">
        <button>탈퇴하기</button>
      </Link>
    </div>
  );
}
