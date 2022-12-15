import styled from "styled-components";
import Link from "next/link";
import useUser from "@hooks/useUser";
import { Accent, BodyText, Col, FlexContainer, Row } from "@styles/Common";
import Mic from "@src/assets/icons/mic.svg";
import Record from "@src/assets/icons/icon_record.png";
import Hospital from "@src/assets/icons/icon_hospital_small.png";
import Setting from "@src/assets/icons/icon_setting.png";
import { media, theme } from "@styles/theme";
import { ToryText } from "./users/records/write/add";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { CircleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ramdomIntroText = ["건강한 하루에요!", "오늘도 반가워요!", "날씨가 추우니 건강에 유의하세요!", "오늘도 즐거운 하루에요!", "행복한 하루에요!"];
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";

const Home = () => {
  const { user } = useUser();

  const [toryMotionIdx, setToryMotionIdx] = useState<number>(1);
  const [randomText, setRandomText] = useState<string>();

  useEffect(() => {
    setRandomText(ramdomIntroText[Math.floor(Math.random() * ramdomIntroText.length)]);
    setTimeout(() => {
      setToryMotionIdx(0);
    }, 2300);
  }, []);

  return (
      <MainContainer>
        <FadeInMotionDiv
          animate={{ opacity: [0, 1, 1], y: [200, 200, 0], transition: { duration: 3, ease: "easeInOut", times: [0, .6, 1]} }}
        >
          <ToryBox>
            <ToryMotion>
              <ToryPurpleAnim segmentIndex={toryMotionIdx} />
            </ToryMotion>
            <TextBox>
              <p>    
                <Accent>
                  <strong>{user ? user?.name : "OOO"}님, </strong>
                </Accent>
                {randomText}
              </p>
              <p>어떤 서비스를 이용하실 건가요?</p>
            </TextBox>
          </ToryBox>
        </FadeInMotionDiv>
        <FadeInMotionDivFull
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, ease: "easeOut", delay: 2.6 } }}
        >
          <WriteBox>
            <Link href="users/records/write">
              <div>
                <CircleButton bgColor="rgba(83, 89, 233)" >
                  <Mic />
                </CircleButton>
                <BodyText>건강 관리를 위해 매일매일 잊지말고 기록해요!</BodyText>
              </div>
              <strong>오늘 기록하기</strong>
            </Link>
          </WriteBox>
          <ButtonBox>
            <Link href="/users/records">
              <RoundedButton lg img bgColor="rgb(108, 113, 240)">
                <i className="record-icon" />
                기록 확인하기
              </RoundedButton>
            </Link>
            <Link href="/users/my-hospital">
              <RoundedButton lg img bgColor="rgb(108, 113, 240)">
                <i className="hospital-icon" />
                내 병원 관리하기
              </RoundedButton>
            </Link>
          </ButtonBox>
          <AccountBtnBox>
            <Link href="/users">
              <div>
                <i />
                계정 설정
              </div>
            </Link>
          </AccountBtnBox>
        </FadeInMotionDivFull>
      </MainContainer>
  );
};
export default Home;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});

const FadeInMotionDiv = styled(motion.div)`
  height: auto;
`;

const FadeInMotionDivFull = styled(FadeInMotionDiv)`
  width: 100%;
`;

const MainContainer = styled(FlexContainer)`
  flex-direction: column;
  padding: 0 20px;

  ${media.mobile} {
    justify-content: flex-start;
  }

`;

const RoundedButton = styled(RoundedDefaultButton)`
  width: 100%;

  i { 
    width: 28px;
    height: 28px;
    background: no-repeat 50% 50%/contain;
    margin-right: 10px;

    &.record-icon {
      background-image: url(${Record.src});
    }

    &.hospital-icon {
      background-image: url(${Hospital.src});
    }
  }

  ${media.custom(1280)} {
    padding: 15px 0;
    font-size: 18px;
  }

  ${media.mobile} {
    padding: 12px 0;
    font-size: 16px;
  }


`;

const CircleButton = styled(CircleDefaultButton)`
  width: 80px;
  height: 80px;
`;

const ToryBox = styled(Row)`
  position: relative;
  justify-content: space-around;
  margin: 100px 0;
  word-break: keep-all;

  ${media.custom(1280)} {
    margin: 90px 0;
  }

  ${media.mobile} {
    flex-direction: column;
    margin: 0 0 30px;
  }

`;

const WriteBox = styled.div`
  margin-bottom: 50px;

  > a {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 860px;
    padding: 30px;
    margin: 0 auto;
    background-color: rgb(217, 222, 255);
    box-shadow: 4px 4px 15px 0px rgba(173, 182, 241, 0.25);
    border-radius: 40px;
    font-weight: 700;
    transition: background 0.3s;
    text-align: center;

    > div {
      margin-bottom: 40px;
    }

    strong {
      font-size: 24px;
      color: ${({ theme }) => theme.color.darkBg};
    }

    button {
      margin: 0 auto 20px;

      svg { 
        width: 65%;
        height: 65%;
      }
    }

    &:hover {
      background-color: rgb(210, 216, 255);
    }
  }


  ${media.custom(1280)} {
    margin-bottom: 40px;

    > a {
      padding: 25px;

      > div {
        margin-bottom: 30px;
      }

      strong {
        font-size: 20px;
      }

      button {
        width: 70px;
        height: 70px;
      }
    }
  }


  ${media.mobile} {
    margin-bottom: 20px;
    
    > a {
      padding: 20px;
      border-radius: 25px;

      strong {
        font-size: 18px;
      }

      button {
        width: 54px;
        height: 54px;
      }
    }
  }

  
`;
const ButtonBox = styled(Row)`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  justify-content: center;

  a {
    display: block;
    width: calc(50% - 3.5%);
  }

  a + a {
    margin-left: 7%;
  }

  ${media.mobile} {
    display: block;

    a {
      width: 100%;
    }
  
    a + a {
      margin-left: 0;
      margin-top: 15px;
    }
  
  }


`;

const AccountBtnBox = styled.div`
  position: relative;
  width: 100px;
  font-weight: 500;
  margin: 120px auto 0;

  > a {
    position: relative;
    z-index: 2;
    > div {
      display: flex;
      align-items: center;
      position: relative;
      z-index: 5;

      i {
        width: 1.2em;
        height: 1.2em;
        background: url(${Setting.src}) no-repeat 50% 50%/contain;
        margin-right: 10px;
      }
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(217, 222, 255, 1) 40%, transparent 40%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    &:before {
      opacity: 1;
    }
  }


  ${media.custom(1280)} {
    margin: 80px auto 20px;
  }

  ${media.mobile} {
    font-size: 14px;
  }


`;
const TextBox = styled(ToryText)`
  margin-bottom: 0;
  text-align: left;
  padding-left: 170px;

  ${media.custom(1280)} {
    padding-left: 130px;
  }

  ${media.tablet} {
    padding-left: 120px;
  }

  ${media.mobile} {
    padding-left: 0;
    text-align: center;
  }

`;

const ToryMotion = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -60%);
  width: 340px;
  height: 340px;
  overflow: hidden;

  ${media.custom(1280)} {
    width: 300px;
    height: 300px;
  }

  ${media.tablet} {
    transform: translate(-40%, -60%);
    width: 260px;
    height: 260px;
  }

  ${media.mobile} {
    position: static;
    transform: translate(0,0);
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }

`;
