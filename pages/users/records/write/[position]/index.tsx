import { CircleButton, RectangleButton, RoundButton } from "@components/button/Button";
import { Position } from "@prisma/client";
import { BlackToryText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import mic from "/public/static/icon/mic.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function WritePositionPage() {
  const router = useRouter();
  const position = router.query.position as Position;
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [comments, setComments] = useState<string[]>([]);

  const handleClickStopListening = () => {
    SpeechRecognition.stopListening();
  };
  const handleClickStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: "ko", continuous: true });
    setComments(prev => [...prev, transcript]);
  };

  console.log(listening, comments);

  if (!browserSupportsSpeechRecognition) {
    return <span>지원안됨</span>;
  }
  return (
    <WhiteWrapper>
      <FlexContainer>
        <Col>
          <BlackToryText>
            <BoxText>{KoreanPosition[position]}</BoxText>에 어떤 증상이 있나요?
          </BlackToryText>
          <RoundButton bgColor={theme.color.mintBtn}>{position}</RoundButton>
          <CircleButton
            bgColor={listening ? theme.color.mintBtn : theme.color.darkBg}
            onClick={listening ? handleClickStopListening : handleClickStartListening}
          >
            <Image src={mic} alt="마이크" />
          </CircleButton>

          {transcript && (
            <Link href="/users/records/write/analysis">
              <RectangleButton
                size="custom"
                width="640px"
                height="100px"
                bgColor="rgb(209, 239, 247)"
                textColor={theme.color.mintBtn}
              >
                {transcript}
              </RectangleButton>
            </Link>
          )}
        </Col>
      </FlexContainer>
    </WhiteWrapper>
  );
}

const BoxText = styled.span`
  font-size: 36px;
  background-color: rgb(232, 233, 255);
  color: ${({ theme }) => theme.color.darkBg};
  border-radius: 10px;
  padding: 0px 10px;
  margin-right: 5px;
`;
