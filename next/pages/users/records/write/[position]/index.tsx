import { CircleButton, RectangleButton, RoundButton } from "@components/buttons/Button";
import { Position } from "@prisma/client";
import { BackButton, BlackToryText, BodyText, Box, Col, FlexContainer, WhiteWrapper } from "@styles/Common";
import { theme } from "@styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { PositionTextBox, TextBox, ToryBox } from "@components/records/BodyPartChecker";
import ToryIcon from "@components/ToryIcon";
import SpeakMotion from "@components/SpeakMotion";
import useAudio from "@hooks/useAudio";
import {
  AI_RESULT_READ,
  BODYPART_CHARTDATA_READ,
  KEYWORDS_CHARTDATA_READ,
  RECORDS_CREATE,
  RECORDS_READ,
} from "constant/queryKeys";
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
    register,
    setValue,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<WriteForm>();
  const [onHoverRefreshBtn, setOnHoverRefreshBtn] = useState(false);
  const { offRecAudio, onRecAudio, audioRecognized, error: aiError } = useAudio();
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(false);
  const [recordStatus, setRecordStatus] = useState<RecordStatus>("initial");
  const queryClient = useQueryClient();
  const { postApi } = customApi("/api/users/records");
  const { mutate } = useMutation<unknown, AxiosError, WriteRecordRequest>([RECORDS_CREATE], postApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
      queryClient.invalidateQueries([AI_RESULT_READ]);
      queryClient.invalidateQueries([BODYPART_CHARTDATA_READ]);
      queryClient.invalidateQueries([KEYWORDS_CHARTDATA_READ]);
      router.push({
        pathname: "/users/records/write/add",
        query: { position },
      });
    },
  });

  const recordMessage: string =
    (recordStatus === "initial" && "아래 버튼을 누르고 증상을 등록해 보세요!") ||
    (recordStatus === "listening" && "증상을 말씀해주세요! 토리가 듣고 정리해드릴게요.") ||
    (recordStatus === "loading" && "토리가 음성을 분석 중이에요! 잠시만 기다려 주세요!") ||
    (recordStatus === "error" && "인식에 실패했어요..") ||
    "";
  const buttonGuideMessage: string =
    (recordStatus === "initial" && "버튼을 누르고 증상을 말해주세요") ||
    (recordStatus === "listening" && "말하기를 종료하려면 버튼을 눌러주세요") ||
    (recordStatus === "loading" && "토리가 음성을 분석 중이에요! 잠시만 기다려 주세요!") ||
    (recordStatus === "finish" && "기록을 완료하려면 버튼을 눌러주세요") ||
    (recordStatus === "error" && "인식에 실패했어요.. 다시 녹음하거나 타이핑으로 입력해 주세요.") ||
    "";
  console.log(audioRecognized);
  const startRecord = () => {
    setError(false);
    setRecordStatus("listening");
    onRecAudio();
  };

  const endRecord = async () => {
    setRecordStatus("loading");
    offRecAudio();
  };
  const hadleClickCreateRecord = (description: string) => {
    console.log("hadleClickCreateRecord", recordStatus, description);
    if (recordStatus === "finish") {
      console.log("mutate");
      if (description.length < 2) return setError(true);
      mutate({ position: router.query.position as string, description });
      router.push("/users/records/write/analysis");
    } else {
      setError(true);
    }
  };
  console.log(aiError);
  const handleClickEditMode = () => {
    setError(false);
    setOnHoverRefreshBtn(false);
    if (!(recordStatus === "finish")) {
      setValue("description", "");
    }
  };

  useEffect(() => {
    if (aiError) {
      setRecordStatus("error");
    } else {
      if (audioRecognized) {
        setRecordStatus("finish");
        setValue("description", audioRecognized);
        setOnHoverRefreshBtn(false);
      }
    }
  }, [audioRecognized, aiError]);

  useEffect(() => {
    if (recordStatus === "listening") setListening(true);
    else setListening(false);
  }, [recordStatus]);

  useEffect(() => {
    if (watch("description").length > 0) {
      setRecordStatus("finish");
      return;
    }
    setRecordStatus("initial");
  }, [watch("description")]);
  return (
    <WhiteWrapper>
      <BackButton onClick={() => router.push("/users/records/write")}>
        <span>부위 선택</span>
      </BackButton>
      <SpeakMotion listening={listening} />
      <FlexContainer>
        <Col>
          <ToryBox>
            <ToryIcon />
          </ToryBox>
          <TextBox>
            <BlackToryText>
              <PositionTextBox>{KoreanPosition[position]}</PositionTextBox>에 어떤 증상이 있나요?
            </BlackToryText>
          </TextBox>
          <VoiceBox>
            <GuideMessage>마이크 사용이 어렵다면 아래 입력창에 직접 입력할 수 있어요!</GuideMessage>
            <MemoBox>
              <MemoInput
                type="text"
                disabled={!isEditMode}
                onClick={handleClickEditMode}
                placeholder={recordMessage}
                {...register("description", {
                  required: "증상을 입력해주세요",
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
            </MemoBox>

            <CircleButton
              width="100px"
              height="100px"
              bgColor={listening ? theme.color.error : theme.color.darkBg}
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

const VoiceBox = styled.div`
  > button {
    margin: 60px auto 30px;
  }
`;
const Rectangle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: white;
`;
const MemoBox = styled.div`
  position: relative;
`;
const RefreshBtnBox = styled(Box)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  text-align: center;
  &:hover {
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.color.mintBtn};
  }
  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus,
  :-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.color.mintBtn} !important;
  }
  ::placeholder {
    color: ${theme.color.mintBtn};
  }
`;
const ErrorMessage = styled(Box)`
  position: absolute;
  color: ${({ theme }) => theme.color.error};
  margin-top: 120px;
  font-size: 18px;
`;
const GuideMessage = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.color.darkBg};
  font-size: 18px;
  margin-bottom: 20px;
`;

const Mic = styled(mic)`
  &:hover {
    fill: red;
  }
`;
