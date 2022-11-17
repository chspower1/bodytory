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
  checkPassword: string;
  gender: string;
  name: string;
  age: number;
}

function RegisterPage() {
  const router = useRouter();
  const [isNotDuplicate, setIsNotDuplicate] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterForm>();
  const { postApi } = useApi("/api/users/register");
  const registerMutate = useMutation(postApi, {
    onError(error) {
      alert(error);
    },
    onSuccess(data) {
      router.replace("/");
    },
  });

  async function onSubmit(data: RegisterForm) {
    const { email, password, checkPassword, gender, name, age } = data;

    if (password !== checkPassword) {
      setError("checkPassword", { message: "비밀번호가 일치하지 않습니다" });
      return;
    }

    registerMutate.mutate({ email, password, gender, name, age });
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
  }, [isNotDuplicate]);

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            type="checkPassword"
            label="비밀번호확인"
            name="checkPassword"
            register={register("checkPassword", { required: "비밀번호 확인을 입력해주세요" })}
            errorMessage={errors.checkPassword?.message}
          />
          <Input
            label="이름"
            name="name"
            register={register("name", { required: "이름을 입력해주세요" })}
            errorMessage={errors.name?.message}
          />
          <Input
            type="number"
            label="나이"
            name="age"
            register={register("age", { required: "나이를 입력해주세요" })}
            errorMessage={errors.age?.message}
          />
          <select {...register("gender", { required: "성별을 입력해주세요" })}>
            <option value="male">남자</option>
            <option value="female">여자</option>
          </select>
          <button disabled={isNotDuplicate ? false : true}>제출</button>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
