import { RoundButton } from "@components/layout/buttons/Button";
import SwiperBox from "@components/my-hospital/SwiperBox";
import { BackButton, Container, Row } from "@styles/Common";
import { theme } from "@styles/theme";
import { DescriptionBox, Pragraph } from "./";
import React, { useState } from "react";
import styled from "styled-components";
import tory from "@src/assets/icons/tory.png";
import { useRouter } from "next/router";
import Link from "next/link";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";

const ClinicList = () => {
  const rounter = useRouter();
  const [currentHospitalName, setCurrentHospitalName] = useState("");
  return (
    <ClinicListWrap>
      <Link href="/users/my-hospital">
        <BackButton>
          <span>병원관리</span>
        </BackButton>
      </Link>
      <ClinicContainer>
        <PageHeadBox>
          <PageHead>
            <ToriBox>
              <ToryPurpleAnim segmentIndex={0} width={260} />
            </ToriBox>
            <DescriptionBox>
              <Pragraph>
                <strong>{currentHospitalName}</strong> 진료목록이에요 <br />
                자세한 진료내역은 각 날짜를 클릭해서 볼 수 있어요
              </Pragraph>
            </DescriptionBox>
          </PageHead>
          <ButtonBox>
            <RoundButton nonSubmit bgColor={theme.color.mintBtn} onClick={() => rounter.push("/users/my-hospital")}>
              나의 병원 전체 목록보기
            </RoundButton>
          </ButtonBox>
        </PageHeadBox>
        <SwiperBox setCurrentHospitalName={setCurrentHospitalName} />
      </ClinicContainer>
    </ClinicListWrap>
  );
};

export default ClinicList;

const ClinicListWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PageHeadBox = styled(Container)`
  margin-top: 30px;
`;

const ClinicContainer = styled.div``;

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
