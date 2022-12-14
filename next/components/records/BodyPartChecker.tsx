import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import ToryIcon from "@components/ToryIcon";
import { BTN_VARIANTS } from "@styles/ButtonStyled";
import { Box, BtnBox, FlexContainer, ToryText } from "@styles/Common";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";
import { KoreanPosition } from "types/write";

interface SelectBodyPartProps {
  selectedBodyPart: bodyPartType;
}

const BodyPartChecker = ({ selectedBodyPart }: SelectBodyPartProps) => {
  const router = useRouter();

  return (
    <FlexContainer>
      <ContentBox>
        <ToryBox>
          <ToryPurpleAnim segmentIndex={0} width={360} />
        </ToryBox>
        <TextBox>
          {!selectedBodyPart ? (
            <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
          ) : (
            <ToryText>
              <PositionTextBox
                key={KoreanPosition[selectedBodyPart]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {KoreanPosition[selectedBodyPart]}
              </PositionTextBox>
              에 대한 증상을 기록할까요?
            </ToryText>
          )}
        </TextBox>
        <CreateBtnBox>
          {selectedBodyPart && (
            <BtnBox variants={BTN_VARIANTS} initial="initial" animate="animate" exit="exit">
              <RoundedDefaultButton
                bgColor="rgb(83, 89, 233)"
                onClick={() => router.push(`./write/${selectedBodyPart}`)}
              >
                네, 기록할게요!
              </RoundedDefaultButton>
            </BtnBox>
          )}
        </CreateBtnBox>
      </ContentBox>
    </FlexContainer>
  );
};

export default BodyPartChecker;

export const PositionTextBox = styled(motion.span)`
  border-radius: 10px;
  background-color: #e8e9ff;
  padding: 5px 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.color.darkBg};
  font-weight: 800;
`;

const ContentBox = styled.div`
  width: 540px;
  padding-bottom: 170px;
`;

export const ToryBox = styled(Box)`
  width: 360px;
  height: 360px;
  margin: 0 auto;
  transform: translate(0, -10%);
`;

export const TextBox = styled(Box)`
  margin-bottom: 90px;
`;
export const CreateBtnBox = styled(BtnBox)`
  height: 60px;
  justify-content: center;
`;
