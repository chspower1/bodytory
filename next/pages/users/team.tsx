import Header from "@components/header/Header";
import styled from "styled-components";
import Han from "@public/static/teamImage/Han.png";
import Kim from "@public/static/teamImage/Kim.png";
import Jung from "@public/static/teamImage/Jung.png";
import Oh from "@public/static/teamImage/Oh.png";
import Jo from "@public/static/teamImage/Jo.png";
import Image from "next/image";
const Team = () => {
  return (
    <Container>
      <Header />
      <TeamContainer>
        <HoSung>
          <Profile>
            <Image src={Jo} width={300} height={300} alt="KyeongWon"></Image>
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
        <KyeongWon>
          <Profile>
            <Image src={Kim} fill alt="KyeongWon"></Image>
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
        <DaHyen>
          <Profile>
            <Image src={Oh} fill alt="KyeongWon"></Image>
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
        <SoHee>
          <Profile>
            <Image src={Jung} fill alt="SoHee"></Image>
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
        <DongRyong>
          <Profile>
            <Image src={Han} fill alt="DongRyong"></Image>
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
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 15px;
  display: inline-block;
  & + & {
    margin-left: 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: rgb(107, 112, 236);
  border-radius: 35px;
  padding: 130px 30px 30px 30px;
  z-index: 10;
  transform: translateY(-150px);
  transition: transform 0.5s, height 0.5s;
  overflow: hidden;
  position: relative;
`;
const Profile = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 30px;
  overflow: hidden;
  transform: translateY(150px);
  transition: transform 0.5s;
  z-index: 11;
  position: relative;
`;
const Description = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;
  padding: 10px;
  font-size: 22px;
  word-break: keep-all;
  color: white;
`;

const BedgeBox = styled.div`
  margin-top: 10px;
`;

const Name = styled.div`
  color: white;
  font-size: 22px;
`;

const Position = styled.span`
  font-size: 16px;
  color: white;
  margin-left: 20px;
`;

const HoSung = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    > div:first-child {
      transform: translateY(0);
    }
    > div:nth-child(2) {
      transform: translateY(-100px);
      height: 400px;
    }
  }
`;
const DongRyong = styled(HoSung)``;
const KyeongWon = styled(HoSung)``;
const DaHyen = styled(HoSung)``;
const SoHee = styled(HoSung)``;

export default Team;
