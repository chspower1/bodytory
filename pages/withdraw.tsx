import { withdrawApi } from '@libs/client/accountApi';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';


interface PWType {
  password : String;
}

export default function withdraw() {
  const [ isModal, setIsModal ] = useState(false);
  const withdrawMutate = useMutation(["withdrawKey"], withdrawApi, {
    onError(error, variables, context) {
      setError("password",{message:`${error}`})
    },
    onSuccess: (data) => {
      if(data.ok){
        setIsModal(true)
      }
    }
  })
  const { register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors } } = useForm<PWType>();
  const onSubmit: SubmitHandler<PWType> = ({password}) => {
    withdrawMutate.mutate({password: password})
  };
  return (
    <div>
      <h3>회원 탈퇴</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4>
            비밀번호를 입력하고 확인을 누르시면<br />
            탈퇴가 진행 됩니다.
        </h4>
        <p><input type="text" {...register("password",{ required: "필수값입니다" })} /></p>
        <p>{errors.password && errors.password.message}</p>
        <button type="submit">탈퇴하기</button>
      </form>
      {isModal && <div>
        <h3>삭제완료!</h3>
        <p>이제 아프지 말고 다신 보지 맙시다~!</p>
        <button onClick={()=>setIsModal(false)}>확인</button>
      </div>}
    </div>
  )
}
