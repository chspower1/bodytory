import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface PWType {
  oldPW: String;
  newPW: String;
  newPWC: String;
}

export default function Edit() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const { putApi } = useApi("/api/users/edit");
  const { mutate } = useMutation(["changePasswordKey"], putApi, {
    onError(error: any) {
      setError("oldPW", { message: `${error}` });
    },
    onSuccess: data => {
      setValue("oldPW", "");
      setValue("newPW", "");
      setValue("newPWC", "");
      if (data.ok) router.replace("/"); /* setIsModal(true) */
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<PWType>();
  const onSubmit: SubmitHandler<PWType> = ({ oldPW, newPW, newPWC }) => {
    if (newPW !== newPWC) {
      setError("newPWC", { message: "비밀번호가 일치하지 않습니다" });
    } else if (oldPW === newPW) {
      setError("newPW", { message: "새로운 비밀번호를 입력해주세요" });
    } else {
      mutate({ password: oldPW, newPassword: newPW });
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
          name="oldPW"
          label="현재 비밀번호"
          type="text"
          register={register("oldPW", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.oldPW?.message}
        />
        <Input
          name="newPW"
          label="새 비밀번호"
          type="text"
          register={register("newPW", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPW?.message}
        />
        <Input
          name="newPWC"
          label="새 비밀번호 확인"
          type="text"
          register={register("newPWC", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPWC?.message}
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
