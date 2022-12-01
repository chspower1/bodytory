import { useMutation, useQuery } from '@tanstack/react-query';
import customApi from '@utils/client/customApi';
import React from 'react'
import { useForm } from 'react-hook-form';

interface TestProps{
  test: string;
}

const TestHos = () => {
  const {postApi, getApi} = customApi("/api/users/my-hospitals/testApi")
  // const {mutate} = useMutation(["testKey"] , postApi,{
  //   onSuccess(data, variables, context) {
  //     console.log(data);
  //   },
  // })
  const { isLoading ,data  , error} = useQuery(["test2key"], getApi);
  console.log(data);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TestProps>({ mode: "onChange" });
  const onValid = (testData: TestProps) => {
    // mutate({id:1});
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input type="text" {...register("test")} />
        <button>제출</button>
      </form>
    </div>
  )
}

export default TestHos;