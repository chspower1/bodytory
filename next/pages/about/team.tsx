import Header from "@components/header/Header";
import styled from "styled-components";
import Han from "@src/assets/images/team/Han.png";
import Kim from "@src/assets/images/team/Kim.png";
import Jung from "@src/assets/images/team/Jung.png";
import Oh from "@src/assets/images/team/Oh.png";
import Jo from "@src/assets/images/team/Cho.png";
import Image from "next/image";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";
import SohiAnim from "@components/lotties/SohiAnim";
import { MouseEvent, useEffect, useRef, useState } from "react";
import HosungAnim from "@components/lotties/HosungAnim";
import DahyunAnim from "@components/lotties/DahyunAnim";
import RyongAnim from "@components/lotties/RyongAnim";
import KyeongwonAnim from "@components/lotties/Kyeongwon";
const Team = () => {

  const [isHover, setIsHover] = useState<boolean>();
  const [hoverWho, setHoverWho] = useState<EventTarget | null>();
  const hosungRef = useRef<HTMLDivElement>(null);
  const kyeongwonRef = useRef<HTMLDivElement>(null);
  const dahyunRef = useRef<HTMLDivElement>(null);
  const sohiRef = useRef<HTMLDivElement>(null);
  const ryongRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    setIsHover(true);
    setHoverWho(e.currentTarget);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    setIsHover(false);
    setHoverWho(null);
  };

  useEffect(() => {
    console.log(isHover, hoverWho, hoverWho === sohiRef.current);
  }, [isHover]);

  return (
    <Container>
      <Header />
      <TeamContainer>
        <HoSung onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={hosungRef} >
          <Profile>
            <HosungAnim segmentIndex={0} play={isHover && hoverWho === hosungRef.current ? true : false} />
          </Profile>
          <DescriptionContainer>
            <Name>
              조호성<Position>팀장</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
              <Bedge backgroundColor="#666666">Motion</Bedge>
            </BedgeBox>
            <Description>fdsfdsfasdfdas</Description>
          </DescriptionContainer>
        </HoSung>
        <KyeongWon onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={kyeongwonRef} >
         <Profile>
          <KyeongwonAnim segmentIndex={0} play={isHover && hoverWho === kyeongwonRef.current ? true : false} />
          </Profile>
          <DescriptionContainer>
            <Name>
              김경원<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
            </BedgeBox>
            <Description>프로젝트 하는 동안 많을 걸 배웠네요 이제 ... 취업합시다 ...</Description>
          </DescriptionContainer>
        </KyeongWon>
        <DaHyen onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={dahyunRef} >
          <Profile>
            <DahyunAnim segmentIndex={0} play={isHover && hoverWho === dahyunRef.current ? true : false} />
          </Profile>
          <DescriptionContainer>
            <Name>
              오다현<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#ffbe14">AI</Bedge>
              <Bedge backgroundColor="#8f00ff">DevOps</Bedge>
            </BedgeBox>
            <Description>AI 너무 어렵네요 ㅋㅋ</Description>
          </DescriptionContainer>
        </DaHyen>
        <SoHee onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={sohiRef} >
         <Profile>
            <SohiAnim segmentIndex={0} play={isHover && hoverWho === sohiRef.current ? true : false} />
          </Profile>
          <DescriptionContainer>
            <Name>
              정소희<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#ffbe14">AI</Bedge>
              <Bedge backgroundColor="#ff5f98">PM/Design</Bedge>
            </BedgeBox>
            <Description>토리엄마입니다. 우리 토리 이쁘게 봐주세요~*^^*</Description>
          </DescriptionContainer>
        </SoHee>
        <DongRyong onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ryongRef} >
          <Profile>
            <RyongAnim segmentIndex={0} play={isHover && hoverWho === ryongRef.current ? true : false} />
          </Profile>
          <DescriptionContainer>
            <Name>
              한동룡<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
            </BedgeBox>
            <Description>{`아직 많이 부족하다고 느껴지네요 다들 <strong>파이팅해요</strong>!!!`}</Description>
          </DescriptionContainer>
        </DongRyong>
      </TeamContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.color.darkBg };
`;

const TeamContainer = styled.div`
  width: 1750px;
  height: 620px;
  display: flex;
  justify-content: space-between;
`;

const Bedge = styled.div<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  width: auto;
  line-height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  display: inline-block;

  & + & {
    margin-left: 5px;
  }
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: rgb(107, 112, 236);
  padding: 30px;
  z-index: 10;
  overflow: hidden;
  position: relative;
  transition: background .4s;
`;

const Profile = styled.div`
  width: 300px;
  height: 300px;
  overflow: hidden;
  z-index: 11;
  position: relative;
  background: #fff;
`;

const Description = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 30px;
  padding: 10px;
  word-break: keep-all;
  color: white;
`;

const BedgeBox = styled.div`
  margin-top: 10px;
`;

const Name = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 700;
`;

const Position = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: white;
  margin-left: 14px;
`;

const HoSung = styled.div`
  width: 300px;
  height: 600px;
  box-shadow: 8px 8px 24px 0px #3136A733;
  transition: transform .4s;
  border-radius: 30px;
  overflow: hidden;

  &:hover {
    transform: scale(1.06);
  }
`;

const DongRyong = styled(HoSung)``;
const KyeongWon = styled(HoSung)``;
const DaHyen = styled(HoSung)``;
const SoHee = styled(HoSung)``;

export default Team;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
