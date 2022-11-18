import RecordUpdate from '@components/RecordUpdate';
import useApi from '@libs/client/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react'

export default function ChartPage() {
  const queryClient = useQueryClient();
  const { getApi, deleteApi } = useApi("/api/records/record");
  const { isLoading, status, data , error } = useQuery(['recordsReadKey'] , getApi);
  const { mutate } = useMutation(['recordDeleteKey'], deleteApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(['recordsReadKey']);
    },
  });
  const [currentIdx, setCurrentIdx] = useState(-1);
  const handleClickUpdateRecord = (idx: React.SetStateAction<number>) => () =>{
    setCurrentIdx(idx)
  }
  const handleClickDeleteRecord = (id: number) => ()=>{
    mutate({id : id})
  }
  if(isLoading){
    return <div>isLoading...</div>
  }
  console.log(data)
  return (
    <div>
      {data.map((ele: any, idx : number)=> (
        <div>
          <div>
            <p>사용자 : {ele.type}</p>
            <p>내용 : {ele.description}</p>
            <p>통증 위치 : {ele.position}</p>
          </div>
          <div>
            {(currentIdx === idx) ? <RecordUpdate recordId={ele.id} setCurrentIdx={setCurrentIdx} /> : <button onClick={handleClickUpdateRecord(idx)}>수정하기</button>}
            <button onClick={handleClickDeleteRecord(ele.id)}>삭제하기</button>
          </div>
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
      <Link href={"/records/write"}>
        <button>
          작성하러 가기
        </button>
      </Link> 
    </div>
  )
}
