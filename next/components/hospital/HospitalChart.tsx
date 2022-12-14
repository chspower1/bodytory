import { RoundButton } from "@components/layout/buttons/SocialButton";
import HospitalModal from "@components/modals/HospitalModal";
import { ChartContainer, ChartWrap, ScrollContainer } from "@components/records/chart/Chart";
import ChartTimeline from "@components/records/chart/ChartTimeline";
import { Position } from "@prisma/client";
import { Row } from "@styles/Common";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { currentPatientInfo } from "atoms/atoms";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { KoreanPosition } from "types/write";

const HospitalChart = () => {
  const { query } = useRouter();
  const position = query.position as Position;
  const { name: patientName, id: patientId } = useRecoilValue(currentPatientInfo);
  const [name, setName] = useState("");
  const [showHospitalModal, setHospitalShowModal] = useState(false);

  const { getApi } = customApi(`/api/hospital/${patientId}`);
  const { data } = useQuery(["currentPatientKey"], getApi);
  useEffect(() => {
    setName(patientName);
  }, [patientName]);
  return (
    <ChartWrap>
      <HospitalModal
        show={showHospitalModal!}
        onClose={() => setHospitalShowModal(false)}
        {...data}
        position={position}
        patientId={patientId}
      />
      <ScrollContainer>
        <ChartContainer>
          <TitleBox>
            <h2>{name ? name : null} 환자의 증상 및 진료기록</h2>
          </TitleBox>
          <PositionRecordsWriteBox>
            <PositionBox>
              <span>{position ? KoreanPosition[position] : null}</span>
              부위
            </PositionBox>
            {position && (
              <RoundButton
                size="md"
                bgColor="rgb(244,245,255)"
                textColor="rgb(83,89,233)"
                onClick={() => setHospitalShowModal(true)}
              >
                진료내역 작성
              </RoundButton>
            )}
          </PositionRecordsWriteBox>
          <ChartTimeline />
        </ChartContainer>
      </ScrollContainer>
    </ChartWrap>
  );
};

export default HospitalChart;

const TitleBox = styled.div`
  text-align: center;
  font-size: 36px;
  padding: 30px 0;
  margin-bottom: 50px;
  color: #fff;
`;

const PositionBox = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  span {
    margin-right: 20px;
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 7px;
    font-weight: 700;
    background: rgba(98, 104, 251, 1);
  }
`;

const PositionRecordsWriteBox = styled(Row)`
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
`;
