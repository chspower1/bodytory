import Input from "@components/Input";
import { changePasswordApi } from "@libs/client/accountApi";
import useUser from "@libs/client/useUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface PWType {
  oldPW: String;
  newPW: String;
  newPWC: String;
}

export default function Edit() {
  const router = useRouter();
  const { user } = useUser();
  const changePwMutate = useMutation(["changePasswordKey"], changePasswordApi, {
    onError(error, variables, context) {
      setError("oldPW", { message: `${error}` });
    },
    onSuccess: data => {
      setValue("oldPW", "");
      setValue("newPW", "");
      setValue("newPWC", "");
      if (data.ok) {
        router.replace("/");
      }
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
      changePwMutate.mutate({ email: user?.email, password: oldPW, newPassword: newPW });
    }
  };
  useEffect(() => {}, []);
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
          label="새로운 비밀번호"
          type="text"
          register={register("newPW", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPW?.message}
        />
        <Input
          name="newPWC"
          label="비밀번호 확인"
          type="text"
          register={register("newPWC", { required: "필수값입니다" })}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.newPWC?.message}
        />

        <button type="submit">제출</button>
      </form>
    </div>
  );
}
