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
  const { getApi } = customApi("/api/users/my-hospitals");
  const { data } = useQuery(["hospital"], getApi);
  const currentUser = useRecoilValue(loggedInUser);
  const [user, setUser] = useState<User | RegisterForm | null>();
  console.log("data",data)

  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  return (
    <MainContainer>
      <MainInnerContainer>
        <DescriptionContainer>
          <DescriptionBox>
            <Pragraph>
              추가할 병원을 검색해주세요
              <br />
              지도에서 내 주변 병원도 확인할 수 있어요
            </Pragraph>
          </DescriptionBox>
          <ButtonBox>
            <RoundButton size="md" bgColor={theme.color.mintBtn}>
              지도에서 내 주변 병원 찾기
            </RoundButton>
          </ButtonBox>
          <SearchBox>
            <Input name="search-hospital" width="700px" bgcolor="#fff" color="black" />
            <RoundButton size="custom" height="60px" bgColor="rgb(100,106,235)">
              검색
            </RoundButton>
          </SearchBox>
        </DescriptionContainer>
        {<HospitalList lists={data} add={true} />}
      </MainInnerContainer>
    </MainContainer>
  );
};

export default FindHospital;

const SearchBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 50px;
`;
const DescriptionContainer = styled.div`
  width: 100%;
`;
