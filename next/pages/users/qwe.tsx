import Header from "@components/header/Header";
import styled from "styled-components";

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
            <div>
              <NameBox style={{ color: "white" }}>조호성</NameBox>
              <BedgeBox></BedgeBox>
              <DescriptionBox></DescriptionBox>
            </div>
          </DescriptionContainer>
        </HoSung>
        <KyeongWon>
          <Profile></Profile>
          <DescriptionContainer>
            <div>
              <NameBox></NameBox>
              <BedgeBox></BedgeBox>
              <DescriptionBox></DescriptionBox>
            </div>
          </DescriptionContainer>
        </KyeongWon>
        <DaHyen>
          <Profile></Profile>
          <DescriptionContainer>
            <div>
              <NameBox></NameBox>
              <BedgeBox></BedgeBox>
              <DescriptionBox></DescriptionBox>
            </div>
          </DescriptionContainer>
        </DaHyen>
        <SoHee>
          <Profile></Profile>
          <DescriptionContainer>
            <div>
              <NameBox></NameBox>
              <BedgeBox></BedgeBox>
              <DescriptionBox></DescriptionBox>
            </div>
          </DescriptionContainer>
        </SoHee>
        <DongRyong>
          <Profile></Profile>
          <DescriptionContainer>
            <div>
              <NameBox></NameBox>
              <BedgeBox></BedgeBox>
              <DescriptionBox></DescriptionBox>
            </div>
          </DescriptionContainer>
        </DongRyong>
      </TeamContainer>
    </Container>
  );
};

const TeamContainer = styled.div`
  width: 1750px;
  height: 620px;
  background-color: green;
  display: flex;
  justify-content: space-between;
`;

const Bedge = styled.div<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  width: auto;
  height: 30px;
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
  padding: 30px;
  z-index: 10;
  transform: translateY(-300px);
  position: relative;
`;
const Profile = styled.div`
  width: 300px;
  height: 300px;
  background-color: blue;
  border-radius: 30px;
  z-index: 11;
  position: relative;
`;
const DescriptionBox = styled.div``;
const Description = styled.div``;
const BedgeBox = styled.div``;
const NameBox = styled.div``;

const HoSung = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    div:nth-child(2) {
      background-color: red;
    }
  }
`;
const DongRyong = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    div:nth-child(2) {
      background-color: red;
    }
  }
`;
const KyeongWon = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    div:nth-child(2) {
      background-color: red;
    }
  }
`;
const DaHyen = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    div:nth-child(2) {
      background-color: red;
    }
  }
`;
const SoHee = styled.div`
  width: 300px;
  height: 600px;
  &:hover {
    div:nth-child(2) {
      background-color: red;
    }
  }
`;

export default qwe;
