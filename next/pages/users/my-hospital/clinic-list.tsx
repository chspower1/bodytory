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
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

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
              <ToryIcon />
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
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
const ClinicListWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`;

const PageHeadBox = styled(Container)`
  margin-top: 75px;
`;

const ClinicContainer = styled.div``;

const PageHead = styled.div`
  display: flex;
  align-items: center;
`;

export const ToriBox = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 190px;
`;

export const ToryIcon = styled.div`
  width: 100%;
  height: 100%;
  background: url(${tory.src}) no-repeat center center;
  background-size: cover;
`;

const ButtonBox = styled(Row)`
  margin: 20px 0;
`;
