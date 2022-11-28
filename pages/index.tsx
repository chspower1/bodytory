import styled, { isStyledComponent } from "styled-components";
import Link from "next/link";
import LogoutBtn from "@components/LogoutBtn";
import { loggedInUser } from "atoms/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { RegisterForm } from "./auth/register";
import useUser from "@hooks/useUser";
import { Accent, BlackToryText, BodyText, Col, Container, FlexContainer, Row, ToryText } from "@styles/Common";
import { CircleButton, RectangleButton, RoundButton } from "@components/button/Button";
import Image from "next/image";
import mic from "/public/static/icon/mic.svg";
import record from "/public/static/icon/record.svg";
import hospital from "/public/static/icon/hospital.svg";
import setting from "/public/static/icon/setting.svg";

export default function Home() {
  const user = useUser();

  return user ? (
    <FlexContainer>
      <Col>
        <BlackToryText>
          <Accent>{user?.name}님,</Accent> 건강한 하루에요!
        </BlackToryText>
        <BlackToryText>어떤 서비스를 이용하실 건가요?</BlackToryText>
        <Link href="users/records/write">
          <RectangleButton width="860px" height="280px" bgColor="rgb(217, 222, 255)">
            <Col>
              <CircleButton>
                <Image src={mic} alt="마이크" />
              </CircleButton>
              <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
              <Accent>오늘 기록하기</Accent>
            </Col>
          </RectangleButton>
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
          <BodyText>
            <BtnIcon src={setting} alt="#" />
            계정 설정
          </BodyText>
        </Link>
      </Col>
    </FlexContainer>
  ) : null;
}

const ButtonBox = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const BtnIcon = styled(Image)`
  margin-right: 20px;
`;
