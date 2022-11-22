import Input from "@components/Input";
import customApi from "utils/client/customApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RECORDS_READ, RECORDS_UPDATE } from "constant/queryKeys";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecordUpdatePropsType {
  recordId: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}
interface RecordUpdateType {
  updateWrite: string;
}

export default function RecordUpdate({ recordId, setCurrentIdx }: RecordUpdatePropsType) {
  const queryClient = useQueryClient();
  const { putApi } = customApi("/api/users/records");
  const { mutate } = useMutation([RECORDS_UPDATE], putApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RecordUpdateType>();
  const onValid: SubmitHandler<RecordUpdateType> = ({ updateWrite }) => {
    mutate({ id: recordId, position: "leg", description: updateWrite });
    setCurrentIdx(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          name="updateWrite"
          label="기록할내용"
          type="text"
          register={register("updateWrite", { required: "필수값입니다" })}
          placeholder="내용을 입력하세요"
          errorMessage={errors.updateWrite?.message}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
