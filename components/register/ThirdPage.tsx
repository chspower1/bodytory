import Input from "@components/Input";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import useApi from "@libs/client/useApi";
import { Gender } from "@prisma/client";

interface ThirdRegisterForm {
  email: string;
  token: string;
  gender: Gender;
  name: string;
  birth: string;
  phone?: string;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const ThirdPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<ThirdRegisterForm>();

  const [isNotDuplicate, setIsNotDuplicate] = useState(false);

  const { postApi: checkAccountIdApi } = useApi("/api/auth/register/check/id");

  const AccountIdRegex = /^[a-zA-Z0-9]*$/;

  const onValid = (data: ThirdRegisterForm) => {
    if (isNotDuplicate) {
      setUser(prev => ({ ...prev!, ...data }));
      setPage(cur => cur + 1);
    } else {
      setError("accountId", { message: "아이디 중복확인 해주세요!" });
    }
  };

  const handleClickCheckAccountId = async () => {
    try {
      await checkAccountIdApi({ accountId: watch("accountId") });
      setIsNotDuplicate(true);
      alert("사용가능한 아이디입니다");
    } catch (err: any) {
      setError("accountId", { message: `${err.data}` });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <Input
        label="이름"
        name="name"
        register={register("name", { required: "이름을 입력해주세요" })}
        errorMessage={errors.name?.message}
      />
      <Input
        label="생일"
        name="birth"
        register={register("birth", {
          required: "생일을 입력해주세요",
          // pattern: /[0-9\-]/g
        })}
        errorMessage={errors.birth?.message}
      />
      <GenderBox>
        <h4>성별</h4>
        <div className="innerBox">
          <div className="inputBox">
            <input
              id="registerGenderMale"
              type="radio"
              value={"male"}
              {...register("gender", { required: "성별을 선택해주세요" })}
            />
            <GenderLabel htmlFor="registerGenderMale">남자</GenderLabel>
          </div>
          <div className="inputBox">
            <input
              id="registerGenderFeMale"
              type="radio"
              value={"female"}
              {...register("gender", { required: "성별을 선택해주세요" })}
            />
            <GenderLabel htmlFor="registerGenderFeMale">여자</GenderLabel>
          </div>
        </div>
        <p>{errors.gender?.message}</p>
      </GenderBox>
      <Input
        label="이메일(본인인증 확인용!!!)"
        name="email"
        disabled={isToken}
        placeholder="abc@abc.com"
        register={register("email", {
          required: "이메일을 입력해주세요",
        })}
        errorMessage={errors.email?.message}
      />
      <ResetBtn />
      {!certifiedComment ? (
        <>
          {isToken && (
            <Input
              name="token"
              label="인증번호"
              register={register("token", {
                required: "인증번호를 입력해주세요.",
              })}
              placeholder="인증번호를 입력해주세요."
              errorMessage={errors.token?.message}
            />
          )}
          <button type="button" onClick={handleClickCheckEmail}>
            {isToken ? "인증번호 확인" : "이메일 인증"}
          </button>
        </>
      ) : (
        <p>{certifiedComment}</p>
      )}

      <button type="submit">회원가입</button>
      <button type="button">이전 페이지</button>
    </form>
  );
};

export default ThirdPage;
