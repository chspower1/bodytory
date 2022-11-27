import { Record } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@utils/client/customApi';
import { loggedInUser } from 'atoms/atoms';
import { RECORDS_READ } from 'constant/queryKeys';
import React from 'react'
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function ChartTimeline() {

  const { getApi } = customApi("/api/users/records");
  const { isLoading, data: records } = useQuery<Record[] | undefined>([RECORDS_READ], getApi, {
    onSuccess(data) {
      console.log(data);
    }
  });


  return (
    <TimelineContainer>
      <Filter>
        <span>전체</span>
        <span>증상기록 모아보기</span>
        <span>병원방문 모아보기</span>
      </Filter>
      <Timeline>
        {
          records?.map((record, idx) => (
            <RecordBox key={idx}>
              <Time>2022년 11월 13일 일요일  오후 10시 16분</Time>
              <Text>
                {record.description}
              </Text>
            </RecordBox>
          ))
        }
        <RecordBox>
          <Time>$2022년 11월 13일 일요일  오후 10시 16분</Time>
          <Symptom>
            <Text>
              $오른쪽 손목이 저릿저릿함
            </Text>
            <Image></Image>
          </Symptom>
        </RecordBox>
        <DeleteButten></DeleteButten>
      </Timeline>
    </TimelineContainer>
  )
}

const TimelineContainer = styled.div`
  background: ${({ theme }) => theme.color.white};
  padding: 30px 40px;
  border-radius: 40px;


`;

const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;


const Timeline = styled.div`
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: calc(100% - 60px);
    background: #363CBF;
  }
`;

const RecordBox = styled.div`
`;

const Symptom = styled.div`
`;

const Text = styled.div`
`;

const Time = styled.div`
`;

const Image = styled.div`
`;

const DeleteButten = styled.div`
`;



export default ChartTimeline