import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
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
  const [isModal, setIsModal] = useState(false);
  const { putApi } = useApi("/api/users/edit");
  const { mutate } = useMutation(["changePasswordKey"], putApi, {
    onError(error: any) {
      setError("oldPassword", { message: `${error}` });
    },
    onSuccess() {
      // setIsModal(true)
      router.replace("/");
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordType>();
  const onSubmit: SubmitHandler<PasswordType> = ({ oldPassword, newPassword, newPasswordConfirm }) => {
    if (newPassword !== newPasswordConfirm) {
      setError("newPasswordConfirm", { message: "비밀번호가 일치하지 않습니다" });
    } else if (oldPassword === newPassword) {
      setError("newPassword", { message: "새로운 비밀번호를 입력해주세요" });
    } else {
      mutate({ password: oldPassword, newPassword: newPassword });
    }
  };
  useEffect(() => {}, []);
  const handleClickGoHome = () => {
    setIsModal(false);
    router.replace("/");
  };
  return (
    <div>
      <h3>비밀번호 변경테스트</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      {/* {isModal && 
      <div>
        <h3>비밀번호 변경 완료</h3>
        <p>비밀번호가 변경 되었습니다.</p>
        <button onClick={handleClickGoHome}>홈으로</button>
      </div>
      } */}
    </div>
  );
}
