import styled, { isStyledComponent } from "styled-components";
import Link from "next/link";
import LogoutBtn from "@components/LogoutBtn";
import { loggedInUser } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { RegisterForm } from "./auth/register";
import useUser from "@hooks/useUser";
import { Accent, BlackToryText, BodyText, Box, Col, Container, FlexContainer, Row, ToryText } from "@styles/Common";
import { CircleButton, RectangleButton, RoundButton } from "@components/button/Button";
import Image from "next/image";
import mic from "/public/static/icon/mic.svg";
import record from "/public/static/icon/record.svg";
import hospital from "/public/static/icon/hospital.svg";
import setting from "/public/static/icon/setting.svg";
import ToryIcon from "@components/ToryIcon";

const Home = () => {
  const user = useUser();

  return user ? (
    <FlexContainer>
      <Col>
        <ToryBox>
          <ToryIcon />
          <Col>
            <BlackToryText>
              <Accent>
                <strong>{user?.name}님,</strong>
              </Accent>
              건강한 하루에요!
            </BlackToryText>
            <BlackToryText>어떤 서비스를 이용하실 건가요?</BlackToryText>
          </Col>
        </ToryBox>
        <Link href="users/records/write">
          <WriteBox>
            <Col>
              <CircleButton>
                <Image src={mic} alt="마이크" />
              </CircleButton>
              <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
              <Accent>오늘 기록하기</Accent>
            </Col>
          </WriteBox>
        </Link>
        <ButtonBox>
          <Link href="/users/records">
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon src={record} alt="#" />
              기록 확인하기
            </RoundButton>
          </Link>
          <Link href={`/hospital/${user?.id!}`}>
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon src={hospital} alt="#" />내 병원 관리하기
            </RoundButton>
          </Link>
        </ButtonBox>
        <Link href="/users/profile/edit">
          <AccountBtnBox>
            <BtnIcon src={setting} alt="#" />
            <BodyText>계정 설정</BodyText>
          </AccountBtnBox>
        </Link>
      </Col>
    </FlexContainer>
  ) : null;
};
export default Home;
const ToryBox = styled(Row)`
  width: 806px;
  justify-content: space-around;
  margin-bottom: 50px;
`;
const WriteBox = styled(Col)`
  width: 860px;
  height: 280px;
  background-color: rgb(217, 222, 255);
  border-radius: 20px;
  margin-bottom: 50px;
`;
const ButtonBox = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const BtnIcon = styled(Image)`
  margin-right: 20px;
`;
const AccountBtnBox = styled(Box)`
  margin-top: 100px;
`;
