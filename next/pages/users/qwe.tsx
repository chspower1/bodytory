import Header from "@components/header/Header";
import styled from "styled-components";
import Han from "@public/static/teamImage/Han.png";
import Kim from "@public/static/teamImage/Kim.png";
import Image from "next/image";

const teams = [
  {
    name: "han5",
    description: "반갑습니다",
    age: "25",
  },
  {
    name: "han4",
    description: "반갑습니다",
    age: "25",
  },
  {
    name: "han3",
    description: "반갑습니다",
    age: "25",
  },
  {
    name: "han2",
    description: "반갑습니다",
    age: "25",
  },
  {
    name: "han1",
    description: "반갑습니다",
    age: "25",
  },
];

const qwe = () => {
  return (
    <Container>
      <Header />
      <TeamContainer>
        <HoSung>
          <Profile></Profile>
          <DescriptionContainer>
            <Name>
              조호성<Position>팀장</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
            </BedgeBox>
            <Description>fdsfdsfasdfdas</Description>
          </DescriptionContainer>
        </HoSung>
        <KyeongWon>
          <Profile>
            <Image src={Kim} width={300} height={300} alt="KyeongWon"></Image>
          </Profile>
          <DescriptionContainer>
            <Name>
              김경원<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
            </BedgeBox>
            <Description></Description>
          </DescriptionContainer>
        </KyeongWon>
        <DaHyen>
          <Profile></Profile>
          <DescriptionContainer>
            <Name>
              오다현<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#ffbe14">AI</Bedge>
              <Bedge backgroundColor="#8f00ff">DevOps</Bedge>
            </BedgeBox>
            <Description></Description>
          </DescriptionContainer>
        </DaHyen>
        <SoHee>
          <Profile></Profile>
          <DescriptionContainer>
            <Name>
              정소희<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#ffbe14">AI</Bedge>
              <Bedge backgroundColor="#ff5f98">PM/Design</Bedge>
            </BedgeBox>
            <Description></Description>
          </DescriptionContainer>
        </SoHee>
        <DongRyong>
          <Profile>
            <Image src={Han} width={300} height={300} alt="DongRyong"></Image>
          </Profile>
          <DescriptionContainer>
            <Name>
              한동룡<Position>팀원</Position>
            </Name>
            <BedgeBox>
              <Bedge backgroundColor="#4a50d3">FrontEnd</Bedge>
              <Bedge backgroundColor="#1dc3bb">BackEnd</Bedge>
            </BedgeBox>
            <Description></Description>
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
  border-radius: 30px;
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

export default qwe;
