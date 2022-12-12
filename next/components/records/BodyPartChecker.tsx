import { RoundButton } from "@components/layout/buttons/Button";
import ToryIcon from "@components/ToryIcon";
import { BTN_VARIANTS } from "@styles/ButtonStyled";
import { Box, BtnBox, Col, FlexContainer, ToryText } from "@styles/Common";
import { AnimatePresence, motion } from "framer-motion";
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
    <FlexContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, type: "tween", ease: "easeOut" }}
    >
      <ContentBox>
        <ToryBox>
          <ToryIcon />
        </ToryBox>
        <TextBox>
          {!selectedBodyPart ? (
            <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
          ) : (
            <ToryText>
              <PositionTextBox
                key={KoreanPosition[selectedBodyPart]}
                initial={{opacity: 0 }}
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
              <RoundButton
                width="250px"
                height="60px"
                bgColor="rgb(83, 89, 233)"
                onClick={() => router.push(`./write/${selectedBodyPart}`)}
              >
                네, 기록할게요!
              </RoundButton>
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
`;

export const ToryBox = styled(Box)`
  margin-bottom: 40px;
`;

export const TextBox = styled(Box)`
  margin-bottom: 90px;
`;
export const CreateBtnBox = styled(BtnBox)`
  height: 60px;
  justify-content: center;
`;
