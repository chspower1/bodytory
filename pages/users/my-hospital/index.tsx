import { RoundButton } from "@components/button/Button";
import { theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { loggedInUser } from "atoms/atoms";
import { HOSPITALS } from "constant/queryKeys";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import medicalIcon from "@public/medical.png";
import HospitalList from "@components/HospitalList";
import Image from "next/image";

const MyHospitalPage = () => {
  const { getApi } = customApi("/api/users/my-hospitals");
  const { data } = useQuery([HOSPITALS], getApi);
  console.log(data);

  const currentUser = useRecoilValue(loggedInUser);
  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  return currentUser ? (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionBox>
          <Pragraph>
            <HighlightText>{currentUser.name}님</HighlightText>의 기록을 공유받고 있는 병원 목록이에요
            <br /> 병원을 클릭하면 해당 병원에서의 진료내역을 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <RoundButton size="custom" width="260px" height="50px">
            <Link href={"/users/my-hospital/find"}>
              <ImageIcon src={medicalIcon} width={20} height={20} alt="병원" /> 병원 추가하기
            </Link>
          </RoundButton>
        </ButtonBox>
        {data && <HospitalList lists={data} add={false} />}
      </MainInnerContainer>
    </MainContainer>
  ) : null;
};

export default MyHospitalPage;

export const MainContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
`;

export const MainInnerContainer = styled.div`
  width: 1600px;
  height: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
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
  height: 100px;
  align-items: end;
`;
