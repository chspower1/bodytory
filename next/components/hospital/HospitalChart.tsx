import { RoundButton } from '@components/buttons/Button'
import { ChartContainer, ChartWrap, ScrollContainer } from '@components/records/chart/Chart'
import ChartTimeline from '@components/records/chart/ChartTimeline'
import { Position } from '@prisma/client'
import { Row } from '@styles/Common'
import { currentPatientName } from 'atoms/atoms'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { bodyPartType } from 'types/bodyParts'
import { KoreanPosition } from 'types/write'

const HospitalChart = ({selectedBodyPart}:{selectedBodyPart : bodyPartType}) => {
  const patientName = useRecoilValue(currentPatientName);
  const [name, setName] = useState("");

  useEffect(()=>{setName(patientName)},[patientName])

  return (
    <ChartWrap>
      <ScrollContainer>
        <ChartContainer>
          <TitleBox>
            <h2>
              {name ? name : null} 환자의 증상 및 진료기록
            </h2>
          </TitleBox>
          <PositionRecordsWriteBox>
            <PositionBox>
              <span>
                {selectedBodyPart ? KoreanPosition[selectedBodyPart] : null}
              </span>
              부위
            </PositionBox>
            <RoundButton size="md" bgColor="rgb(244,245,255)" textColor="rgb(83,89,233)">
              진료내역 작성
            </RoundButton>
          </PositionRecordsWriteBox>
          <ChartTimeline />
        </ChartContainer>
      </ScrollContainer>
    </ChartWrap>
  )
}

export default HospitalChart;

const TitleBox = styled.div`
  text-align:center;
  font-size: 36px;
  padding: 30px 0;
  margin-bottom: 50px;
  color: #fff;
`


const PositionBox = styled.div`
  display:flex;
  align-items:center;
  color:#fff;
  span{
    margin-right: 20px;
    width: 80px;
    line-height: 50px;
    text-align:center;
    border-radius: 7px;
    font-weight: 700;
    background: rgba(98, 104, 251, 1);
  }
`

const PositionRecordsWriteBox = styled(Row)`
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
`