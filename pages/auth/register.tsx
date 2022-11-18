import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation } from "@tanstack/react-query";
import client from "@libs/server/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface RegisterForm {
  accountId: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: string;
  name: string;
  birth: string;
}



function RegisterPage() {
  const router = useRouter();
  const [isNotDuplicate, setIsNotDuplicate] = useState<Boolean>(true);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
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
    const { accountId, email, password, passwordConfirm, gender, name, birth } = data;

    if (password !== passwordConfirm) {
      setError("passwordConfirm", { message: "비밀번호가 일치하지 않습니다" });
      return;
    }

    mutate({ accountId, email, password, gender, name, birth });
  }

  useEffect(() => {
    setError("accountId", { type: "custom", message: isNotDuplicate ? "사용 가능한 아이디입니다." : "중복된 아이디 입니다." });
  }, [isNotDuplicate]);

  useEffect(() => {
    clearErrors();
  }, []);

  const enterAccountId = watch("accountId");
  const { postApi: checkAccountIdApi } = useApi("/api/users/checkAccountId");
  const handleClickCheckAccountId = (e : React.MouseEvent<HTMLElement>)=>{
    e.preventDefault();
    if(enterAccountId === ""){
      setError("accountId", {message:"아이디를 입력해주세요"})
    }else{
      checkAccountIdApi({accountId : enterAccountId})
        .then(res => setError("accountId", {message:`${res}`}))
        .catch(err => setError("accountId", {message:`${err}`}))
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            label="아이디"
            name="accountId"
            placeholder="아이디를 입력해주세요"
            register={register("accountId", { required: "아이디를 입력해주세요" })}
            errorMessage={errors.accountId?.message}
          />
          <button onClick={handleClickCheckAccountId}>중복확인</button>
          <Input
            label="이메일"
            name="email"
            placeholder="abc@abc.com"
            register={register("email", { required: "이메일을 입력해주세요",
              pattern:{
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message : "이메일 형식이 아닙니다"
              }
            })}
            errorMessage={errors.email?.message}
          />
          <Input
            type="password"
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            register={register("password", { required: "비밀번호를 입력해주세요" })}
            errorMessage={errors.password?.message}
          />
          <Input
            type="password"
            label="비밀번호 확인"
            name="passwordConfirm"
            placeholder="한번 더 입력해주세요"
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
            label="생일"
            name="birth"
            register={register("birth", { required: "생일을 입력해주세요",  
                // pattern: /[0-9\-]/g
              })}
            errorMessage={errors.birth?.message}
          />
          <GenderBox>
            <h4>성별</h4>
            <div className="innerBox">
              <div className="inputBox">
                <input id="registerGenderMale" type="radio" value={"male"} {...register("gender")} />
                <GenderLabel htmlFor="registerGenderMale">남자</GenderLabel>
              </div>
              <div className="inputBox">
                <input id="registerGenderFeMale"  type="radio" value={"female"} {...register("gender")} />
                <GenderLabel htmlFor="registerGenderFeMale">여자</GenderLabel>
              </div>
            </div>
          </GenderBox>
          <button disabled={!isNotDuplicate}>제출</button>
        </form>
      </div>
    </>
  );
}


const GenderBox = styled.div`

.innerBox{
  display: inline-flex;
}

.inputBox{
  width:80px;
  height:50px;
  border: 1px solid #000;
}

input{
  position:absolute;
  left: -999999%;
}
  input:checked + label{
    background: #000;
    color: #fff;
  }
`
const GenderLabel = styled.label`
  display: block;
  width: 100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export default RegisterPage;
