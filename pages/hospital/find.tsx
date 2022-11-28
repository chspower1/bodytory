import { RoundButton } from "@components/button/Button";
import HospitalList from "@components/HospitalList";
import Input from "@components/Input";
import { User } from "@prisma/client";
import { FlexContainer, InnerContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { loggedInUser } from "atoms/atoms";
import { RegisterForm } from "pages/auth/register";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ButtonBox, DescriptionBox, MainContainer, MainInnerContainer, Pragraph } from ".";

const FindHospital = () => {
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

  return (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionBox>
          <Pragraph>
            추가할 병원을 검색해주세요
            <br />
            지도에서 내 주변 병원도 확인할 수 있어요
          </Pragraph>
        </DescriptionBox>
        <ButtonBox>
          <RoundButton size="md">지도에서 내 주변 병원 찾기</RoundButton>
        </ButtonBox>
        <div>
          <Input name="search-hospital" width="700px" bgcolor="#fff" color="black" />
          <RoundButton size="sm">검색</RoundButton>
        </div>
        <HospitalList lists={undefined} add={true} />
      </MainInnerContainer>
    </MainContainer>
  );
};

export default FindHospital;
