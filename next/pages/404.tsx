import { FlexContainer } from "@styles/Common";
import styled from "styled-components";
import toriQuestionIcon from "@src/assets/icons/toriQuestion.png";
import { theme } from "@styles/theme";
import Link from "next/link";
import { CircleDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { NextPage } from "next";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { useEffect, useState } from "react";

const NotFoundPage: NextPage = () => {

  const [toryMotionIdx, setToryMotionIdx] = useState<number>(2);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setToryMotionIdx(5);
    }, 2200);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <FlexContainer>
      <ContentBox>
        <ToriBox>
          <ToryMotion>
            <ToryPurpleAnim segmentIndex={toryMotionIdx} />
          </ToryMotion>
        </ToriBox>
        <TextBox>
          <p>요청하신 페이지를 찾지 못했어요</p>
          <p>바디토리로 돌아갈까요?</p>
          <Link href="/">
            <CircleDefaultButton sm bgColor={theme.color.input}>
              네
            </CircleDefaultButton>
          </Link>
        </TextBox>
      </ContentBox>
    </FlexContainer>
  );
};

export default NotFoundPage;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
`;

const ToriBox = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 300px;
`;

const ToryMotion = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  transform: translate(-50%, -70%);
`;

const TextBox = styled.div`
  margin-left: 60px;
  font-size: 40px;
  color: ${({ theme }) => theme.color.darkBg};
  p {
    font-weight: 700;
  }
  button {
    margin: 50px auto 0;
    font-size: 15px;
  }
`;
