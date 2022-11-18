import Input from '@components/Input';
import useApi from '@libs/client/useApi';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface WriteType{
  write: string;
}

export interface WriteRecord{
  type : string;
  position : string;
  description : string;
}

export default function WritePage() {

  const { postApi } = useApi("/api/records/records");
  const { mutate } = useMutation(['recordsWriteKey'] , postApi);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<WriteType>();
  const onSubmit: SubmitHandler<WriteType> = ({ write }) => {
    mutate({ type:"user", position: "arm", description:write})
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
          name="write"
          label="기록할내용"
          type="text"
          register={register("write", { required: "필수값입니다" })}
          placeholder="내용을 입력하세요"
          errorMessage={errors.write?.message}
        />
      <button type="submit" >기록하기</button>
    </form>
    </div>
  )
}
