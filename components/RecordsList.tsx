import useApi from "@libs/client/useApi";
import { Record } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RecordUpdate from "./RecordUpdate";
import { useState } from "react";
export default function RecordsList(): JSX.Element {
  const queryClient = useQueryClient();
  const { getApi, deleteApi } = useApi("/api/users/records");
  const { isLoading, data: records } = useQuery<Record[] | undefined>(["recordsReadKey"], getApi);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const { mutate } = useMutation(["recordDeleteKey"], deleteApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["recordsReadKey"]);
    },
  });
  const handleClickUpdateRecord = (idx: React.SetStateAction<number>) => () => {
    setCurrentIdx(idx);
  };
  const handleClickDeleteRecord = (id: number) => () => {
    mutate({ id: id });
  };
  return records?.map((record, idx) => (
    <div key={idx}>
      <div>
        <p>사용자 : {record.type}</p>
        <p>내용 : {record.description}</p>
        <p>통증 위치 : {record.position}</p>
      </div>
      <div>
        {currentIdx === idx ? (
          <RecordUpdate recordId={record.id + ""} setCurrentIdx={setCurrentIdx} />
        ) : (
          <button onClick={handleClickUpdateRecord(idx)}>수정하기</button>
        )}
        <button onClick={handleClickDeleteRecord(record.id)}>삭제하기</button>
      </div>
    </div>
  ));
}
