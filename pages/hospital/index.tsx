import { RectangleButton, RoundButton } from "@components/button/Button";
import HospitalList from "@components/HospitalList";
import { User } from "@prisma/client";
import { Container } from "@styles/Common";
import { theme } from "@styles/theme";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { loggedInUser } from "atoms/atoms";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "pages/auth/register";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import medicalIcon from "../../public/medical.png";

const Hospital = () => {
  const { getApi } = customApi("/api/users/hospital");
  const { data } = useQuery(["hospital"], getApi);
  const currentUser = useRecoilValue(loggedInUser);
  const [user, setUser] = useState<User | RegisterForm | null>();

  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionBox>
          <Pragraph>
            <HighlightText>{user?.name}님</HighlightText>의 기록을 공유받고 있는 병원 목록이에요
            <br /> 병원을 클릭하면 해당 병원에서의 진료내역을 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <RoundButton size="custom" width="260px" height="50px">
            <Link href={"/hospital/find"}>
              <ImageIcon src={medicalIcon} width={20} height={20} alt="병원" /> 병원 추가하기
            </Link>
          </RoundButton>
        </ButtonBox>
        <HospitalList lists={data?.hospitals} add={false} />
      </MainInnerContainer>
    </MainContainer>
  );
};

export default Hospital;

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
