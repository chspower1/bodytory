import Input from '@components/Input'
import  { changePasswordApi } from '@libs/client/accountApi';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface PWType {
  oldPW : String;
  newPW : String;
  newPWC : String;
}

export default function change() {
  const changePwMutate = useMutation(["changePasswordKey"], changePasswordApi, {
    onError(error, variables, context) {
      setError("oldPW",{message:`${error}`})
    },
    onSuccess: () => {
      setValue("oldPW","")
      setValue("newPW","")
      setValue("newPWC","")
    }
  })
  const { register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors } } = useForm<PWType>();
  const onSubmit: SubmitHandler<PWType> = ({oldPW, newPW, newPWC}) => {
    if(newPW !== newPWC){
      setError("newPWC", {message:"비밀번호가 일치하지 않습니다"})
    }else if(oldPW === newPW){
      setError("newPW", {message:"새로운 비밀번호를 입력해주세요"})
    }else{
      changePwMutate.mutate({password: oldPW, newPassword: newPW})
    }
    
  };
  return (
    <div>
      <h3>비밀번호 변경테스트</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p><input type="text" {...register("oldPW",{ required: "필수값입니다" })} /></p>
        <p>{errors.oldPW && errors.oldPW.message}</p>
        <p><input type="text" {...register("newPW",{ required: "필수값입니다" })} /></p>
        <p>{errors.newPW && errors.newPW.message}</p>
        <p><input type="text" {...register("newPWC",{ required: "필수값입니다" })} /></p>
        <p>{errors.newPWC && errors.newPWC.message}</p>
        <button type="submit">제출</button>
      </form>
    </div>
  )
}
