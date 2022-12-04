import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Position } from "@prisma/client";
import { BlackToryText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { PositionBoxText, TextBox, ToryBox } from "@components/records/BodyPartChecker";
import ToryIcon from "@components/ToryIcon";
import SpeakMotion from "@components/SpeakMotion";
import useAudio from "@hooks/useAudio";
import { RECORDS_CREATE } from "constant/queryKeys";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import pencil from "@public/static/icon/pencil.svg";
import mic from "@public/static/icon/mic.svg";
import Check from "@public/static/icon/check.svg";

interface WriteRecordRequest {
  position: string;
  description: string;
}
type RecordStatus = "initial" | "finish" | "listening" | "loading";
const PositionPage = () => {
  const router = useRouter();
  const position = router.query.position as Position;
  const [isOnInput, setIsOnInput] = useState(false);
  const [isOnSubmit, setIsOnSubmit] = useState(false);
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
    if (isOnSubmit) {
      if (audioRecognized && recordStatus === "finish") {
        mutate({ position: router.query.position as string, description: audioRecognized });
      } else {
        setIsOnSubmit(false);
        setError(true);
      }
    } else setIsOnSubmit(true);
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
      <Link href="/users/records/write">
        <BackBtn>뒤로가기</BackBtn>
      </Link>
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
            <MemoBox>
              <MemoInput disabled={isOnInput} value={recordMessgae ? recordMessgae : ""} />
              {error && <ErrorMessage>증상을 입력해주세요!</ErrorMessage>}

              <Pencil width={30} height={30} fill={theme.color.mintBtn} onClick={() => setIsOnInput(prev => !prev)} />
              <SubmitButton
                onClick={hadleClickCreateRecord}
                className={isOnSubmit ? "active" : ""}
                onBlur={() => setIsOnSubmit(false)}
              >
                <Check width={30} height={30} />
                <span>제출</span>
              </SubmitButton>
            </MemoBox>
            <CircleButton
              width="100px"
              height="100px"
              bgColor={listening ? theme.color.error : theme.color.darkBg}
              onClick={listening ? endRecord : startRecord}
              boxShadow={false}
            >
              {!listening ? <Mic /> : <Rectangle />}
            </CircleButton>
          </VoiceBox>
        </Col>
      </FlexContainer>
      <SpeakMotion right listening={listening} />
    </WhiteWrapper>
  );
};

export default PositionPage;
const BackBtn = styled(motion.div)`
  position: fixed;
  margin: 10px;
  background-color: red;
`;
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
  position: relative;
`;
const SubmitBtn = styled.button`
  position: absolute;
`;
const MemoInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 640px;
  max-width: 1000px;
  padding: 20px;
  background-color: rgb(209, 239, 247);
  color: ${({ theme }) => theme.color.mintBtn};
  font-size: 22px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
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
const Pencil = styled(pencil)`
  position: absolute;
  right: 20px;
  transition: all 0.5s ease;
  &:hover {
    fill: ${({ theme }) => theme.color.darkBg};
  }
`;
const Mic = styled(mic)`
  &:hover {
    fill: red;
  }
`;
const SubmitButton = styled.button<{ recordId?: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: #d9deff;
  border-radius: 0 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.4s, width 0.4s;

  svg {
    width: 22px;
    height: 22px;
    fill: #8c9af3;
    transition: transform 0.4s;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 40px;
    z-index: -1;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
    margin-top: 7px;
    opacity: 0;
    transition: opacity 0.4s, zIndex 0.4s, transform 0.4s;
  }

  &:hover {
    background: #c6cdfa;

    svg {
      fill: #5359e9;
    }
  }

  &.active {
    width: 70px;
    background: ${({ theme }) => theme.color.darkBg};

    svg {
      transform: translate(0, -5px);
      fill: #fff;
    }

    span {
      opacity: 1;
      z-index: 1;
      transform: translate(-50%, 5px);
    }
  }
`;
