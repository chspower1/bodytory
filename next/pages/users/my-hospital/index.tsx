import { RoundButton } from "@components/layout/buttons/Button";
import { theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { HOSPITALS } from "constant/queryKeys";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import medicalIcon from "@src/assets/icons/medical.png";
import HospitalList from "@components/my-hospital/MyHospitalList";
import Image from "next/image";
import useUser from "@hooks/useUser";
import { Hospital, MedicalDepartment } from "@prisma/client";
import MyHospitalList from "@components/my-hospital/MyHospitalList";
import MyHospitalModal from "@components/modals/MyHospitalModal";

export interface MyHospitalResponse {
  hospital: MyHospital;
  shared: boolean;
}
export type MyHospital = Hospital & {
  medicalDepartments: {
    medicalDepartment: MedicalDepartment | null;
  }[];
  my?: boolean;
};

const MyHospitalPage = () => {
  const { getApi } = customApi("/api/users/my-hospitals");
  const { data, isLoading } = useQuery<MyHospitalResponse[]>([HOSPITALS], getApi);
  const { user } = useUser();

  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  return user ? (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionBox>
          <Pragraph>
            <HighlightText>{user.name}님</HighlightText>의 기록을 공유받고 있는 병원 목록이에요
            <br /> 병원을 클릭하면 해당 병원에서의 진료내역을 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <Link href={"/users/my-hospital/find"}>
            <RoundButton size="custom" width="260px" height="50px">
              <ImageIcon src={medicalIcon} width={20} height={20} alt="병원" /> 병원 추가하기
            </RoundButton>
          </Link>
        </ButtonBox>
        <MyHospitalList hospitals={data} add={false} isLoading={isLoading} />
      </MainInnerContainer>
    </MainContainer>
  ) : null;
};

export default MyHospitalPage;

export const MainContainer = styled.div`
  height: 100%;
  display: flex;
  margin: 0 auto;
`;

export const MainInnerContainer = styled.div`
  width: 1600px;
  margin: auto;
`;

export const Pragraph = styled.p`
  font-size: 32px;
  strong {
    font-weight: 700;
  }
`;
export const HighlightText = styled.span`
  color: rgb(100, 106, 235);
  font-size: 32px;
  font-weight: 700;
`;

export const DescriptionBox = styled.div`
  width: 100%;
  height: 200px;
  text-align: left;
  padding: 50px;
`;

export const ImageIcon = styled(Image)`
  margin-right: 20px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 0 50px;
`;
