import styled, { isStyledComponent } from "styled-components";
import Link from "next/link";
import useUser from "@hooks/useUser";
import { Accent, BlackToryText, BodyText, Box, Col, Container, FlexContainer, Row } from "@styles/Common";
import { CircleButton, RectangleButton, RoundButton } from "@components/layout/buttons/Button";
import Image from "next/image";
import Mic from "@src/assets/icons/mic.svg";
import Record from "@src/assets/icons/record.svg";
import Hospital from "@src/assets/icons/hospital.svg";
import Setting from "@src/assets/icons/setting.svg";
import ToryIcon from "@components/ToryIcon";
import { theme } from "@styles/theme";
import { ToryText } from "./users/records/write/add";

const Home = () => {
  const { user } = useUser();

  return (
    <FlexContainer>
      <Col>
        <ToryBox>
          <ToryIcon />
          <TextBox>
            <Accent>
              <strong>{user ? user?.name : "OOO"}님, </strong>
            </Accent>
            건강한 하루에요!
            <br />
            어떤 서비스를 이용하실 건가요?
          </TextBox>
        </ToryBox>
        <WriteBox>
          <Link href="users/records/write">
            <CircleButton>
              <Mic width={50} height={50} />
            </CircleButton>
            <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
            <Accent fontSize="26px">오늘 기록하기</Accent>
          </Link>
        </WriteBox>
        <ButtonBox>
          <Link href="/users/records">
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon>
                <Record width={30} height={30} fill={theme.color.mint} />
              </BtnIcon>
              기록 확인하기
            </RoundButton>
          </Link>
          <Link href={`/users/my-hospital`}>
            <RoundButton width="400px" height="70px" bgColor="rgb(108, 113, 240)">
              <BtnIcon>
                <Hospital width={30} height={30} fill={theme.color.mint} />
              </BtnIcon>
              내 병원 관리하기
            </RoundButton>
          </Link>
        </ButtonBox>
        <AccountBtnBox>
          <Link href="/users/profile/edit">
            <div>
              <Setting />
              계정 설정
            </div>
          </Link>
        </AccountBtnBox>
      </Col>
    </FlexContainer>
  );
};
export default Home;

const EditButtonBox = styled.div``;

const ToryBox = styled(Row)`
  width: 806px;
  justify-content: space-around;
  margin-bottom: 50px;
`;
const WriteBox = styled.div`
  margin-bottom: 50px;
  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 860px;
    height: 280px;
    background-color: rgb(217, 222, 255);
    border-radius: 20px;
    gap: 20px;
  }
`;
const ButtonBox = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const BtnIcon = styled.div`
  margin-right: 20px;
`;
const AccountBtnBox = styled.div`
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.color.darkBg};
  }
  margin-top: 100px;
  > a {
    > div {
      display: flex;
      align-items: center;

      svg {
        margin: -2px 10px 0 0;
      }
    }
  }
`;
const TextBox = styled(ToryText)`
  margin-bottom: 0;
  text-align: left;
`;
