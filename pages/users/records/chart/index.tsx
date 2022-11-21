import RecordUpdate from "@components/RecordUpdate";
import useApi from "@libs/client/useApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import client from "@libs/server/client";
import { Record } from "@prisma/client";
import RecordsList from "@components/RecordsList";
// test용 데이터
// const initialData = [0, 1, 2, 3].map((_, index) => ({
//   id: index,
//   createAt: Date.now(),
//   updateAt: Date.now(),
//   type: "user",
//   position: "arm",
//   disease: "dd",
//   description: "sdd",
//   userId: index,
//   hospitalId: null,
// }));
export default function ChartPage() {
  const queryClient = useQueryClient();
  const { getApi, deleteApi } = useApi("/api/users/records");
  const { isLoading, data: records } = useQuery<Record[] | undefined>(["recordsReadKey"], getApi);
  const { mutate } = useMutation(["recordDeleteKey"], deleteApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["recordsReadKey"]);
    },
  });
  const [currentIdx, setCurrentIdx] = useState(-1);
  const handleClickUpdateRecord = (idx: React.SetStateAction<number>) => () => {
    setCurrentIdx(idx);
  };
  const handleClickDeleteRecord = (id: number) => () => {
    mutate({ id: id });
  };
  // if (isLoading) return null;
  return (
    <div>
      {records?.map((record, idx) => (
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
      ))}

      <br />
      <br />
      <br />
      <br />
      <Link href={"/users/records/write"}>
        <button>작성하러 가기</button>
      </Link>
    </div>
  );
}
