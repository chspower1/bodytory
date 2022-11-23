import RecordUpdate from "@components/RecordUpdate";
import customApi from "utils/client/customApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RECORDS_DELETE, RECORDS_READ } from "constant/queryKeys";
import Link from "next/link";
import React, { useState, Suspense } from "react";
import { Record, RecordImage } from "@prisma/client";

interface RecordWithImage extends Record {
  images: RecordImage[];
}
export default function ChartPage() {
  const queryClient = useQueryClient();
  const { getApi, deleteApi } = customApi("/api/users/records");
  const { isLoading, data: records } = useQuery<Record[] | undefined>([RECORDS_READ], getApi);
  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const [currentIdx, setCurrentIdx] = useState(-1);
  const handleClickUpdateRecord = (idx: React.SetStateAction<number>) => () => {
    setCurrentIdx(idx);
  };
  const handleClickDeleteRecord = (id: number) => () => {
    mutate({ id: id });
  };
  if (isLoading) return null;
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
              <RecordUpdate recordId={record.id} setCurrentIdx={setCurrentIdx} />
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
