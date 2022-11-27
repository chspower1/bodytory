import { RoundButton } from "@components/button/Button";
import { useRouter } from "next/router";
import { SiteType } from "pages/users/records/write";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface SiteCheckerProps {
  hoveredSite: string;
  selectedSite: SiteType;
  setSelectedSite: Dispatch<SetStateAction<SiteType>>;
}

const SiteChecker = ({ hoveredSite, selectedSite, setSelectedSite }: SiteCheckerProps) => {
  const router = useRouter();

  return (
    <CheckerContainer>
      <ToriBox></ToriBox>
      {selectedSite === null ? (
        <TestText>증상을 기록할 부위를 선택해주세요</TestText>
      ) : (
        <TestText>{hoveredSite}에 대한 증상을 기록할까요?</TestText>
      )}
      {selectedSite === null ? (
        <Displayer>{hoveredSite}</Displayer>
      ) : (
        <ButtonsBox>
          <RoundButton width="auto" height="60px" onClick={() => router.push(`./write/${selectedSite}`)}>
            네
          </RoundButton>
          <RoundButton width="auto" height="60px" onClick={() => setSelectedSite(null)}>
            아니요, 다시 선택할래요
          </RoundButton>
        </ButtonsBox>
      )}
    </CheckerContainer>
  );
};

const CheckerContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 150px 0;
`;

const ToriBox = styled.div`
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
`;

const TestText = styled.div`
  margin-left: auto;
  margin-right: auto;
  height: 64px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 64px;
  /* identical to box height, or 178% */

  text-align: center;

  color: #2b2d64;
`;

const Displayer = styled.div`
  width: 200px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;

  background: #d0eef7;
  border-radius: 15px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 70px;
  /* identical to box height, or 233% */

  text-align: center;

  color: #12d4c9;
`;

const ButtonsBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 472px;
  height: 60px;
  display: flex;
`;

export default SiteChecker;
