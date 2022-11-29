import { RectangleButton, RoundButton } from "@components/button/Button";
import ToryIcon from "@components/ToryIcon";
import { Box, BtnBox, Col, Container, FlexContainer, Row, ToryText } from "@styles/Common";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";
import { KoreanPosition } from "types/write";

interface SiteCheckerProps {
  hoveredSite: string;
  selectedSite: bodyPartType;
  setSelectedSite: Dispatch<SetStateAction<bodyPartType>>;
}

const SiteChecker = ({ hoveredSite, selectedSite, setSelectedSite }: SiteCheckerProps) => {
  const router = useRouter();

  return (
    <FlexContainer>
      <Col style={{ height: "100vh" }}>
        <ToryBox>
          <ToryIcon />
        </ToryBox>
        <TextBox>
          {!selectedSite ? (
            <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
          ) : (
            <ToryText>
              <PositionBoxText>{KoreanPosition[selectedSite]}</PositionBoxText>에 대한 증상을 기록할까요?
            </ToryText>
          )}
        </TextBox>
        <CreateBtnBox>
          {selectedSite && (
            <BtnBox>
              <RoundButton
                width="250px"
                height="60px"
                bgColor="rgb(83, 89, 233)"
                onClick={() => router.push(`./write/${selectedSite}`)}
              >
                네, 기록할게요!
              </RoundButton>
            </BtnBox>
          )}
        </CreateBtnBox>
      </Col>
    </FlexContainer>
  );
};

export default SiteChecker;

export const PositionBoxText = styled.span`
  border-radius: 10px;
  background-color: #e8e9ff;
  padding: 5px 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.color.darkBg};
  font-weight: 800;
`;
export const ToryBox = styled(Box)`
  height: 45%;
`;
export const TextBox = styled(Box)`
  height: 10%;
`;
export const CreateBtnBox = styled(BtnBox)`
  height: 45%;
`;
