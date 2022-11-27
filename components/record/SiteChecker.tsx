import { RectangleButton, RoundButton } from "@components/button/Button";
import { Box, Col, Container, FlexContainer, ToryText } from "@styles/Common";
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
        {!selectedSite ? (
          <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
        ) : (
          <ToryText>
            <PositionBoxText>{hoveredSite}</PositionBoxText>에 대한 증상을 기록할까요?
          </ToryText>
        )}

        {!selectedSite ? (
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
            <RoundButton
              width="125px"
              height="60px"
              bgColor="rgb(83, 89, 233)"
              onClick={() => router.push(`./write/${selectedSite}`)}
            >
              네
            </RoundButton>
            <RoundButton
              width="310px"
              height="60px"
              bgColor="rgb(198, 205, 250)"
              textColor="rgb(93, 107, 178)"
              onClick={() => setSelectedSite(null)}
            >
              아니요, 다시 선택할래요
            </RoundButton>
          </ButtonsBox>
        )}
      </Col>
    </FlexContainer>
  );
};
export const PositionBoxText = styled.span`
  border-radius: 10px;
  background-color: #e8e9ff;
  padding: 5px 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.color.darkBg};
  font-weight: 800;
`;
const ButtonsBox = styled(Box)`
  margin-top: 140px;
  width: 480px;
  justify-content: space-between;
`;

export default SiteChecker;
