import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Position } from "@prisma/client";
import { BlackToryText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import mic from "@public/static/icon/mic.svg";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { PositionBoxText, TextBox, ToryBox } from "@components/records/BodyPartChecker";
import ToryIcon from "@components/ToryIcon";
import SpeakMotion from "@components/SpeakMotion";
import useAudio from "@hooks/useAudio";
import { RECORDS_CREATE } from "constant/queryKeys";

import { AxiosError } from "axios";

interface WriteRecordRequest {
  position: string;
  description: string;
}
type RecordStatus = "initial" | "finish" | "listening" | "loading";
const PositionPage = () => {
  const { query } = useRouter();
  const position = query.position as Position;

  const { offRecAudio, onRecAudio, audioRecognized } = useAudio();
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(false);
  const [recordStatus, setRecordStatus] = useState<RecordStatus>("initial");
  const { postApi } = customApi("/api/users/records");
  const { mutate } = useMutation<unknown, AxiosError, WriteRecordRequest>([RECORDS_CREATE], postApi, {
    onSuccess(data) {
      router.push("/users/records/write/add");
    },
  });
  const recordMessgae =
    (recordStatus === "initial" && "아래 버튼을 누르고 증상을 등록해 보세요!") ||
    (recordStatus === "listening" && "증상을 말씀해주세요! 토리가 듣고 정리해드릴게요.") ||
    (recordStatus === "loading" && "토리가 음성을 분석 중이에요! 잠시만 기다려 주세요!") ||
    (recordStatus === "finish" && audioRecognized);
  const startRecord = () => {
    setError(false);
    setRecordStatus("listening");
    onRecAudio();
  };

  const endRecord = async () => {
    setRecordStatus("loading");
    offRecAudio();
  };
  const hadleClickCreateRecord = () => {
    if (audioRecognized && recordStatus === "finish") {
      mutate({ position: router.query.position as string, description: audioRecognized });
    } else setError(true);
  };
  useEffect(() => {
    if (audioRecognized) setRecordStatus("finish");
  }, [audioRecognized]);
  useEffect(() => {
    if (recordStatus === "listening") setListening(true);
    else setListening(false);
  }, [recordStatus]);
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
              <PositionBoxText>{KoreanPosition[position]}</PositionBoxText>에 어떤 증상이 있나요?
            </BlackToryText>
          </Box>
          <VoiceBox height="30%">
            <MemoBox onClick={hadleClickCreateRecord}>
              {error && <ErrorMessage>증상을 입력해주세요!</ErrorMessage>}
              {recordMessgae}
            </MemoBox>

            <CircleButton
              bgColor={listening ? theme.color.error : theme.color.darkBg}
              onClick={listening ? endRecord : startRecord}
              boxShadow={false}
            >
              {!listening ? <Image src={mic} alt="마이크" /> : <Rectangle />}
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
const Rectangle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
`;

const MemoBox = styled(Box)`
  width: 640px;
  max-width: 1000px;
  padding: 20px;
  background-color: rgb(209, 239, 247);
  color: ${({ theme }) => theme.color.mintBtn};
  font-size: 22px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.color.mintBtn};
  }
`;
const ErrorMessage = styled(Box)`
  position: absolute;
  color: ${({ theme }) => theme.color.error};
  margin-top: 120px;
  font-size: 18px;
`;
