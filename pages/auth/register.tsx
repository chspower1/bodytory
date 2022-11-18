import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { MouseEvent, useEffect, useState } from "react";
import axios from "axios";

interface RegisterForm {
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  name: string;
  birth: string;
  phone?: string;
}

function RegisterPage() {
  const router = useRouter();
  const [isNotDuplicate, setIsNotDuplicate] = useState<Boolean>();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<RegisterForm>();
  const { postApi } = useApi("/api/auth/register");
  const { mutate } = useMutation(postApi, {
    onError(error: any) {
      alert(`${error.data}`);
    },
    onSuccess(data) {
      router.replace("/");
    },
  });

  async function onValid(data: RegisterForm) {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다" });
      return;
    }

    mutate(data);
  }

  async function checkDuplicateEmail(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    event.preventDefault();
    const enterEmail = watch("email");
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!regex.test(enterEmail)) return setError("email", { type: "custom", message: "이메일 형식이 아닙니다." });

    try {
      const result = await axios.post("/api/users/checkemail", { enterEmail });
      setIsNotDuplicate(true);
    } catch (error) {
      setIsNotDuplicate(false);
    }
  }
  useEffect(() => {
    setError("email", { type: "custom", message: isNotDuplicate ? "적합한 이메일" : "중복이메일" });
  }, [isNotDuplicate, setError]);

  useEffect(() => {
    clearErrors();
    if (router.query) {
      const { email, phone, name, birth, gender } = router.query;
      console.log(router.query);
      setValue("email", (email as string) || "");
      setValue("phone", (phone as string) || "");
      setValue("name", (name as string) || "");
      setValue("birth", (birth as string) || "");
      // setValue("gender", (gender as string) || "");
    }
  }, [clearErrors, router, setValue]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            label="이메일"
            name="email"
            placeholder="abc@abc.com"
            register={register("email", { required: "이메일을 입력해주세요" })}
            errorMessage={errors.email?.message}
          />
          <button onClick={event => checkDuplicateEmail(event)}>중복확인</button>
          <Input
            type="password"
            label="비밀번호"
            name="password"
            register={register("password", { required: "비밀번호를 입력해주세요" })}
            errorMessage={errors.password?.message}
          />
          <Input
            type="passwordConfirm"
            label="비밀번호확인"
            name="passwordConfirm"
            register={register("passwordConfirm", { required: "비밀번호 확인을 입력해주세요" })}
            errorMessage={errors.passwordConfirm?.message}
          />
          <Input
            label="이름"
            name="name"
            register={register("name", { required: "이름을 입력해주세요" })}
            errorMessage={errors.name?.message}
          />
          <Input
            type="number"
            label="생년월일"
            name="age"
            register={register("birth", { required: "나이를 입력해주세요" })}
            errorMessage={errors.birth?.message}
          />
          <Input
            type="radio"
            label="남자"
            name="gender"
            value="male"
            register={register("gender")}
            errorMessage={errors.birth?.message}
          />
          <Input
            type="radio"
            label="여자"
            name="gender"
            value="female"
            register={register("gender")}
            errorMessage={errors.birth?.message}
          />

          <button disabled={isNotDuplicate ? false : true}>제출</button>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
