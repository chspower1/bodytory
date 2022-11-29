import { Record, RecordImage } from '@prisma/client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/client/customApi';
import { RECORDS_DELETE, RECORDS_READ } from 'constant/queryKeys';
import React, {  useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { format } from 'date-fns';
import {ko} from "date-fns/locale";
import ManageImage from '@components/ManageImage';

interface RecordWithImage extends Record {
  images: RecordImage[];
}

function ChartTimeline() {

  const { getApi, deleteApi } = customApi("/api/users/records");
  const { isLoading, data: records } = useQuery<Record[] | undefined>([RECORDS_READ], getApi);

  const queryClient = useQueryClient();
  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(-1);  // 삭제버튼이 한번 클릭되었는지 확인 (삭제버튼 빨갛게 변함. 그 상테에서 한번더 누르면 진짜 삭제)
  const DelButtonRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  
  useEffect(() => {
    function handleOutsideClick(event: React.BaseSyntheticEvent | MouseEvent) {
      console.log(DelButtonRef.current, event.target);
      console.log(DelButtonRef.current.contains(event.target));

      if (  // 삭제버튼 바깥 클릭
        DelButtonRef.current && 
        !DelButtonRef.current.contains(event.target)
      ) {
        setConfirmDelete(-1);
      } else {  // 삭제 버튼 한번 더 누름
        mutate({ id: confirmDelete });
      }
    }

    // Add event after component rendering
    document.addEventListener("click", handleOutsideClick, true);
    // Remove event when component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };

  }, [DelButtonRef]);


  // useEffect(() => {
  //   console.log("삭제할 레코드 번호", confirmDelete);
  // }, [confirmDelete])
  
  // 삭제버튼 클릭
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, recordId: number) => {
    setConfirmDelete(recordId);
  }


  return (
    <TimelineContainer>
      <Filter>
        <span>전체</span>
        <span>증상기록 모아보기</span>
        <span>병원방문 모아보기</span>
      </Filter>
      <Timeline>
        {
          records?.map((record, index) => (
            <RecordBox key={index}>
              <Time>{format(new Date(record.createAt), "yyyy년 M월 d일 EEEE aaaa h시 m분", {locale: ko})}</Time>
              <Content>
                <Description>
                  <Text>
                    {record.description}
                  </Text>
                  <Image></Image>
                </Description>
                <DeleteButton onClick={(e) => handleClick(e, record.id)} ref={DelButtonRef} recordId={record.id} className={confirmDelete === record.id ? "delActive" : ""}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                  <span>삭제</span>
                </DeleteButton>
              </Content>
            </RecordBox>
          ))
        }
      </Timeline>
    </TimelineContainer>
  )
}

const TimelineContainer = styled.div`
  background: #F4F5FF;
  padding: 30px 40px;
  border-radius: 40px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;


const Timeline = styled.div`

`;

const RecordBox = styled.div`
  position: relative;
  padding-left: 20px;

  &:before {
    content: "";
    position: absolute;
    top: 16px;
    left: 0;
    width: 1px;
    height: calc(100% + 40px);
    background: #363CBF;
  }

  &:last-child:before {
    display: none;
  }

  & + & {
    margin-top: 40px;
  }
`;


const Time = styled.div`
  position: relative;
  padding: 10px;
  font-size: 16px;
    
  &:after {
    content: "";
    position: absolute;
    top: calc(10px + 6px);
    left: calc(-20px - 8px);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.darkBg}
  }
`;

const Content = styled.div`
  position: relative;
`;


const Description = styled.div`
  min-height: 140px;
  background: #EBECFC;
  padding: 20px 30px;
  border-radius: 20px;
`;

const Text = styled.div`
`;

const Image = styled.div`
`;

const DeleteButton = styled.button<{recordId: number}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  min-height: 140px;
  background: #D9DEFF;
  border-radius: 0 20px 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background .4s, width .4s;
  
  svg {
    width: 22px;
    height: 22px;
    fill: #8C9AF3; 
    transition: transform .4s;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 40px;
    z-index: -1;
    font-size: 14px;
    font-weight: 700;
    color: ${({theme}) => theme.color.white};
    margin-top: 7px;
    opacity: 0;
    transition: opacity .4s, zIndex .4s, transform .4s;
  }
  
  &:hover {
    background: #C6CDFA;
    
    svg {
      fill: #5359E9; 
    }
  }

  &.delActive {
    width: 70px;
    background: ${({theme}) => theme.color.error};

    svg {
      transform: translate(0, -5px);
      fill: #fff;
    }

    span {
      opacity: 1;
      z-index: 1;
      transform: translate(-50%, 5px);
    }
  }
`;
  


export default ChartTimeline