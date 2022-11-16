import Input from "@components/Input";
import axios from "axios";
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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterForm>();

  function post({ email, password, gender, name, age }: RegisterForm) {
    axios.post("/api/users/register", {
      email,
      password,
      gender,
      name,
      age,
    });
    console.log("요청보냄");
  }

  function onValid(data: RegisterForm) {
    post(data);
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
            label="성별"
            name="gender"
            register={register("gender", { required: "이메일을 입력해주세요" })}
            errorMessage={errors.email?.message}
          />
          <Input
            label="나이"
            name="age"
            register={register("age", { required: "나이를 입력해주세요" })}
            errorMessage={errors.age?.message}
          />
          <button>제출</button>
        </form>
      </div>
    </>
  );
}
export default RegisterPage;
