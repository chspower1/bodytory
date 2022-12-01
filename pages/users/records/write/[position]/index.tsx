import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Position } from "@prisma/client";
import { BlackToryText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import mic from "@public/static/icon/mic.svg";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { PositionBoxText, TextBox, ToryBox } from "@components/records/SiteChecker";
import ToryIcon from "@components/ToryIcon";
import SpeakMotion from "@components/SpeakMotion";
import useAudio from "@hooks/useAudio";
import { RECORDS_CREATE } from "constant/queryKeys";
import { bodyPartType } from "types/bodyParts";
import { AxiosError } from "axios";
import { ParsedUrlQuery } from "querystring";
interface WriteRecordRequest {
  position: string;
  description: string;
}
const PositionPage = () => {
  const { query } = useRouter();
  const { offRecAudio, onRecAudio, audioRecognized } = useAudio();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { postApi } = customApi("/api/users/records");
  const { mutate } = useMutation<unknown, AxiosError, WriteRecordRequest>([RECORDS_CREATE], postApi, {
    onSuccess(data) {},
  });
  const startRecord = () => {
    resetTranscript();
    onRecAudio();
    SpeechRecognition.startListening({ continuous: true, language: "ko" });
  };

  const endRecord = async () => {
    offRecAudio();
    SpeechRecognition.stopListening();
  };
  const hadleClickCreateRecord = () => {
    if (audioRecognized) {
      mutate({ position: query.position as string, description: audioRecognized });
    } else console.log("증상을 말해주세요");
  };
  console.log(transcript);
  return (
    <WhiteWrapper>
      <SpeakMotion listening={listening} />
      <FlexContainer>
        <Col height="100vh">
          <Box height="20%">
            <ToryIcon />
          </Box>
          <Box height="30%">
            <BlackToryText>
              <PositionBoxText>신체부위</PositionBoxText>에 어떤 증상이 있나요?
            </BlackToryText>
          </Box>
          <VoiceBox height="30%">
            <RectangleButton
              size="custom"
              width="640px"
              height="100px"
              bgColor="rgb(209, 239, 247)"
              textColor={theme.color.mintBtn}
              onClick={hadleClickCreateRecord}
              fontSize="30px"
              boxShadow={false}
            >
              {listening
                ? transcript
                  ? transcript
                  : "증상을 말해주세요"
                : audioRecognized
                ? audioRecognized
                : transcript}
            </RectangleButton>
            <CircleButton
              bgColor={listening ? theme.color.mintBtn : theme.color.darkBg}
              onClick={listening ? endRecord : startRecord}
              boxShadow={false}
            >
              <Image src={mic} alt="마이크" />
            </CircleButton>
          </VoiceBox>
        </Col>
      </FlexContainer>
      <SpeakMotion right listening={listening} />
    </WhiteWrapper>
  );
};

export default PositionPage;
const VoiceBox = styled(Col)`
  gap: 60px;
`;
