import styled from "styled-components";

interface SiteCheckerProps {
  hoveredSite: string;
}

const SiteChecker = ({ hoveredSite }: SiteCheckerProps) => {
  return (
    <CheckerContainer>
      <ToriBox></ToriBox>
      <TestText>증상을 기록할 부위를 선택해주세요</TestText>
      <Displayer>{hoveredSite}</Displayer>
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

export default SiteChecker;
