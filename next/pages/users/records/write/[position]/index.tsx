import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Position } from "@prisma/client";
import { BlackToryText, BodyText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
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
import check from "@public/static/icon/check.png";
import refresh from "@public/static/icon/refresh.png";
import { useForm } from "react-hook-form";

interface WriteRecordRequest {
  position: string;
  description: string;
}
interface WriteForm {
  description: string;
}
type RecordStatus = "initial" | "finish" | "listening" | "loading" | "error";
const PositionPage = () => {
  const router = useRouter();
  const position = router.query.position as Position;
  const [isEditMode, setIsEditMode] = useState(true);
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<WriteForm>();
  const [onHoverRefreshBtn, setOnHoverRefreshBtn] = useState(false);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(false);
  const [recordStatus, setRecordStatus] = useState<RecordStatus>("initial");
  const { offRecAudio, onRecAudio, audioRecognized, error: aiError } = useAudio();
  const { postApi } = customApi("/api/users/records");
  const { mutate } = useMutation<unknown, AxiosError, WriteRecordRequest>([RECORDS_CREATE], postApi, {
    onSuccess(data) {
      router.push(
        {
          pathname: "/users/records/write/add",
          query: { position: KoreanPosition[position] },
        },
        "/users/records/write/add",
      );
    },
  });

  const recordMessage: string =
    (recordStatus === "initial" && "아래 버튼을 누르고 증상을 등록해 보세요!") ||
    (recordStatus === "listening" && "증상을 말씀해주세요! 토리가 듣고 정리해드릴게요.") ||
    (recordStatus === "loading" && "토리가 음성을 분석 중이에요! 잠시만 기다려 주세요!") ||
    (recordStatus === "error" && "인식에 실패했어요..") ||
    (recordStatus === "finish" && audioRecognized) ||
    "";
  const buttonGuideMessage: string =
    (recordStatus === "initial" && "버튼을 누르고 증상을 말해주세요") ||
    (recordStatus === "listening" && "말하기를 종료하려면 버튼을 눌러주세요") ||
    (recordStatus === "loading" && "토리가 음성을 분석 중이에요! 잠시만 기다려 주세요!") ||
    (recordStatus === "finish" && "기록을 완료하려면 버튼을 눌러주세요") ||
    (recordStatus === "error" && "인식에 실패했어요.. 다시 녹음하거나 타이핑으로 입력해 주세요.") ||
    "";
  const startRecord = async () => {
    try {
      await onRecAudio();
      setError(false);
      setRecordStatus("listening");
    } catch {
      setError(true);
      setRecordStatus("initial");
    }
  };

  const endRecord = async () => {
    setRecordStatus("loading");
    offRecAudio();
  };
  const hadleClickCreateRecord = (description: string) => {
    if (recordStatus === "finish") {
      if (description.length < 2) return setError(true);
      mutate({ position: router.query.position as string, description });
      router.push("/users/records/write/analysis");
    } else {
      setError(true);
    }
  };
  const handleClickEditMode = () => {
    setError(false);
    setOnHoverRefreshBtn(false);
    if (!(recordStatus === "finish")) {
      setValue("description", "");
    }
    setRecordStatus("finish");
    setIsEditMode(true);
  };
  useEffect(() => {
    if (recordMessage === null) {
      setValue("description", "다시 한번 말씀해주세요");
    }
    setValue("description", recordMessage);
  }, [recordMessage, setValue]);

  useEffect(() => {
    if (aiError) {
      setRecordStatus("error");
    } else {
      if (audioRecognized) {
        setRecordStatus("finish");
        setOnHoverRefreshBtn(false);
      }
    }
  }, [audioRecognized, aiError]);

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
              <GuideMessage>마이크 사용이 어렵다면 아래 입력창에 직접 입력할 수 있어요!</GuideMessage>
              <MemoInput
                type="text"
                disabled={!isEditMode}
                onClick={handleClickEditMode}
                {...register("description", {
                  required: "증상을 입력해주세요",
                  onBlur: () => {
                    !(recordStatus === "finish") && setValue("description", recordMessage);
                    clearErrors("description");
                  },
                })}
              />
              {recordStatus === "finish" && (
                <RefreshBtnBox>
                  <CircleButton
                    nonSubmit
                    onClick={startRecord}
                    bgColor={theme.color.mintBtn}
                    width="46px"
                    height="46px"
                    boxShadow={false}
                  >
                    <Image
                      src={refresh}
                      width={30}
                      height={30}
                      alt="다시 녹음"
                      onMouseEnter={() => setOnHoverRefreshBtn(true)}
                      onMouseLeave={() => setOnHoverRefreshBtn(false)}
                    />
                  </CircleButton>
                  {onHoverRefreshBtn && <RefreshText>다시 녹음하기</RefreshText>}
                </RefreshBtnBox>
              )}
              {(error || errors.description) && <ErrorMessage>증상을 입력해주세요!</ErrorMessage>}
            </MemoBox>

            <CircleButton
              width="100px"
              height="100px"
              bgColor={
                listening
                  ? theme.color.error
                  : isEditMode && getValues("description")
                  ? theme.color.darkBg
                  : recordStatus === "initial"
                  ? theme.color.darkBg
                  : theme.color.disabled
              }
              onClick={() => {
                recordStatus === "initial" && startRecord();
                recordStatus === "listening" && endRecord();
                recordStatus === "finish" && hadleClickCreateRecord(watch("description"));
                recordStatus === "error" && startRecord();
              }}
              boxShadow={false}
            >
              {recordStatus === "initial" && <Mic />}
              {recordStatus === "listening" && <Rectangle />}
              {recordStatus === "loading" && "loading"}
              {recordStatus === "finish" && <Image src={check} width={55} height={55} alt="제출" />}
              {recordStatus === "error" && <Mic />}
            </CircleButton>
          </VoiceBox>
          <BodyText>{buttonGuideMessage}</BodyText>
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
  gap: 15px;
`;
const RefreshBtnBox = styled(Box)`
  position: absolute;
  right: -60px;
`;
const RefreshText = styled.div`
  position: absolute;
  right: -110px;
  color: ${({ theme }) => theme.color.mintBtn};
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
const GuideMessage = styled(Box)`
  position: absolute;
  color: ${({ theme }) => theme.color.darkBg};
  margin-bottom: 120px;
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
  z-index: 1000;

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
