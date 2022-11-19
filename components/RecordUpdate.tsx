import Input from "@components/Input";
import useApi from "@libs/client/useApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecordUpdatePropsType {
  recordId: string;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}
interface RecordUpdateType {
  updateWrite: string;
}

export default function RecordUpdate({ recordId, setCurrentIdx }: RecordUpdatePropsType) {
  const queryClient = useQueryClient();
  const { putApi } = useApi("/api/users/records");
  const { mutate } = useMutation(["recordsUpdateKey"], putApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["recordsReadKey"]);
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
