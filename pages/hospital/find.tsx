import { RoundButton } from "@components/button/Button";
import HospitalList from "@components/HospitalList";
import Input from "@components/Input";
import { User } from "@prisma/client";
import { FlexContainer, InnerContainer } from "@styles/Common";
import { theme } from "@styles/theme";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { loggedInUser } from "atoms/atoms";
import Image from "next/image";
import { RegisterForm } from "pages/auth/register";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ButtonBox, DescriptionBox, ImageIcon, MainContainer, MainInnerContainer, Pragraph } from ".";
import mapIcon from "../../public/static/icon/mapIcon.svg";

interface SearchForm {
  search: string;
}

const FindHospital = () => {
  const { getApi } = customApi("/api/users/hospital");
  const { data } = useQuery(["hospital"], getApi);
  const currentUser = useRecoilValue(loggedInUser);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SearchForm>({ mode: "onChange" });

  useEffect(() => {
    document.body.style.backgroundColor = theme.color.lightBg;
    return () => {
      document.body.style.backgroundColor = theme.color.darkBg;
    };
  }, []);

  const onValid = (input: SearchForm) => {
    setValue("search", "");
    console.log(input);
  };

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
            <RoundButton size="md" bgColor={theme.color.mintBtn} nonSubmit>
              <ImageIcon src={mapIcon} width={30} height={30} alt="map" />
              지도에서 내 주변 병원 찾기
            </RoundButton>
          </ButtonBox>
          <SearchBox>
            <SearchForm onSubmit={handleSubmit(onValid)}>
              <Input name="search" width="700px" bgcolor="#fff" color="black" register={register("search")} />
              <RoundButton size="custom" height="60px" bgColor="rgb(100,106,235)">
                검색
              </RoundButton>
            </SearchForm>
          </SearchBox>
        </DescriptionContainer>
        {<HospitalList lists={data?.hospitals} add={true} />}
      </MainInnerContainer>
    </MainContainer>
  );
};

export default FindHospital;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

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
