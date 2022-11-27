import { RectangleButton, RoundButton } from "@components/button/Button";
import { Col, Container, FlexContainer, ToryText } from "@styles/Common";
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
    <FlexContainer>
      <Col>
        {selectedSite === null ? (
          <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
        ) : (
          <ToryText>
            <PositionText>{hoveredSite}</PositionText>에 대한 증상을 기록할까요?
          </ToryText>
        )}

        {selectedSite === null ? (
          <RectangleButton
            bgColor="rgb(208, 238, 247)"
            textColor="rgb(18, 212, 201)"
            width="200px"
            height="70px"
            fontSize="30px"
          >
            {hoveredSite}
          </RectangleButton>
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
      </Col>
    </FlexContainer>
  );
};
const PositionText = styled.span`
  border-radius: 10px;
  background-color: #e8e9ff;
  padding: 5px 20px;
  margin-right: 10px;
`;
const ButtonsBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 472px;
  height: 60px;
  display: flex;
`;

export default SiteChecker;
