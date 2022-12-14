import { media, theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { HOSPITALS } from "constant/queryKeys";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";
import medicalIcon from "@src/assets/icons/medical.png";
import Image from "next/image";
import useUser from "@hooks/useUser";
import { Hospital, MedicalDepartment } from "@prisma/client";
import MyHospitalList from "@components/my-hospital/MyHospitalList";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";

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
          <ToryMotion>
            <ToryPurpleAnim segmentIndex={0} />
          </ToryMotion>
          <Pragraph>
            <HighlightText>{user.name}님</HighlightText>의 기록을 공유받고 있는 병원 목록이에요
            <br /> 진료내역도 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <Link href={"/users/my-hospital/find"}>
            <AddHospitalButton img>
              <ImageIcon src={medicalIcon} width={20} height={20} alt="병원" /> 병원 추가하기
            </AddHospitalButton>
          </Link>
        </ButtonBox>
        <MyHospitalList hospitals={data} add={false} isLoading={isLoading} />
      </MainInnerContainer>
    </MainContainer>
  ) : null;
};

export default MyHospitalPage;
const AddHospitalButton = styled(RoundedDefaultButton)`
  padding: 15px 50px;
  ${media.mobile} {
    width: 200px;
    padding: 10px;
    font-size: 12px;
    svg,
    img {
      width: 15px;
      height: 15px;
    }
  }
`;

export const MainContainer = styled.div`
  height: 100%;
  display: flex;
  margin: 0 auto;
`;

export const MainInnerContainer = styled.div`
  width: 1600px;
  margin: auto;
  ${media.custom(1440)} {
    padding: 0 100px;
  }
  ${media.tablet} {
    padding: 20px;
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

export const Pragraph = styled.p`
  font-size: 32px;
  strong {
    font-weight: 700;
  }
  ${media.custom(1130)} {
    width: auto;
    display: block;
    max-height: 150px;
    font-size: 20px;
  }
  ${media.tablet} {
    font-size: 18px;
  }
  ${media.mobile} {
    font-size: 11px;
    width: auto;
    display: block;
    position: absolute;
    left: 0;
  }
`;
export const HighlightText = styled.span`
  color: rgb(83, 89, 233);
  font-size: 32px;
  font-weight: 700;
`;

export const DescriptionBox = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  text-align: left;
  padding: 50px 50px 50px 180px;
  ${media.tablet} {
    padding: 80px 50px 50px;
  }
`;

export const ImageIcon = styled(Image)`
  margin-right: 20px;
`;

export const ButtonBox = styled.div<{ isMap?: boolean }>`
  display: flex;
  justify-content: center;
  padding: ${({ isMap }) => (isMap ? ` 0 0 30px` : ` 0 0 42px`)};
  ${media.mobile} {
  }
`;

const ToryMotion = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-25%, -60%);
  width: 260px;
  height: 260px;
  margin-right: 30px;
  ${media.mobile} {
    top: -10px;
    left: -80px;
  }
`;
