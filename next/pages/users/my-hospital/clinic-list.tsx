import SwiperBox from "@components/my-hospital/SwiperBox";
import { BackButton, Container, Row } from "@styles/Common";
import { theme } from "@styles/theme";
import { DescriptionBox, Pragraph } from "./";
import React, { useState } from "react";
import styled from "styled-components";
import tory from "@src/assets/icons/tory.png";
import {  useRouter } from "next/router";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";

const ClinicList = () => {
  const router = useRouter();
  const [currentHospitalName, setCurrentHospitalName] = useState("");
  return (
    <ClinicListWrap>
      <BackButton onClick={()=> router.push("/users/my-hospital")}>
        <span>병원관리</span>
      </BackButton>
      <ClinicContainer>
        <PageHeadBox>
          <PageHead>
            <ToriBox>
              <ToryPurpleAnim segmentIndex={0} />
            </ToriBox>
            <DescriptionBox>
              <Pragraph>
                <strong>{currentHospitalName}</strong> 진료목록이에요 <br />
                자세한 진료내역은 각 날짜를 클릭해서 볼 수 있어요
              </Pragraph>
            </DescriptionBox>
          </PageHead>
          <ButtonBox>
            <RoundedDefaultButton bgColor={theme.color.mintBtn} onClick={() => router.push("/users/my-hospital")}>
              나의 병원 전체 목록보기
            </RoundedDefaultButton>
          </ButtonBox>
        </PageHeadBox>
        <SwiperBox setCurrentHospitalName={setCurrentHospitalName} />
      </ClinicContainer>
    </ClinicListWrap>
  );
};

export default ClinicList;

const ClinicListWrap = styled.div`
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;

const PageHeadBox = styled(Container)`
  margin-top: 30px;
`;

const ClinicContainer = styled.div`
`;

const PageHead = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ToriBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-20%, -60%);
  width: 260px;
  height: 260px;
`;


const ButtonBox = styled(Row)`
  margin: 20px 0;
`;
