import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface RegisterForm {
  email: string;
  password: string;
  checkpassword: string;
  gender: string;
  name: string;
  age: number;
}

function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>();
  const { postApi } = useApi("/api/users/register");
  const registerMutate = useMutation(postApi, {
    onError(error) {
      alert(error);
    },
    onSuccess(data) {
      console.log(data);
      router.replace("/");
    },
  });

  // function post({ email, password, gender, name, age }: RegisterForm) {
  //   const result = axios.post("/api/users/register", {
  //     email,
  //     password,
  //     gender,
  //     name,
  //     age,
  //   });
  //   console.log("요청보냄");
  //   return result;
  // };

  async function onValid(data: RegisterForm) {
    const { email, password, gender, name, age } = data;
    registerMutate.mutate({ email, password, gender, name, age });
  }

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
          <Input
            type="password"
            label="비밀번호"
            name="password"
            register={register("password", { required: "비밀번호를 입력해주세요" })}
            errorMessage={errors.password?.message}
          />
          <Input
            label="이름"
            name="name"
            register={register("name", { required: "비밀번호 확인을 입력해주세요" })}
            errorMessage={errors.checkpassword?.message}
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
          <button>제출</button>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
