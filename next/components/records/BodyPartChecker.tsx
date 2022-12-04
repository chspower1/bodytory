import { RoundButton } from "@components/buttons/Button";
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
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, type: "tween", ease: "easeOut" }}
    >
      <Col style={{ height: "100vh" }}>
        <ToryBox>
          <ToryIcon />
        </ToryBox>
        <TextBox>
          {!selectedBodyPart ? (
            <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
          ) : (
            <ToryText>
              <PositionBoxText
                key={KoreanPosition[selectedBodyPart]}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {KoreanPosition[selectedBodyPart]}
              </PositionBoxText>
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
      </Col>
    </FlexContainer>
  );
};

export default BodyPartChecker;

export const PositionBoxText = styled(motion.span)`
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
