import { RoundButton } from "@components/button/Button";
import ManageImage from "@components/ManageImage";
import { RecordWithImageAndHospital } from "@components/records/ChartTimeline";
import { Record, RecordImage } from "@prisma/client";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { selectedRecord } from "atoms/atoms";
import { RECORDS_DELETE, RECORDS_READ, RECORDS_UPDATE } from "constant/queryKeys";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled, { css, keyframes } from "styled-components";
import { showFrame } from "./Modal";

export interface RecordWithImage extends Record {
  images: RecordImage[];
}

interface RecordUpdateType {
  updateWrite: string;
}
interface RecordModalProps {
  setShowRecordModal: React.Dispatch<React.SetStateAction<boolean>>;
  record: RecordWithImageAndHospital;
}
const RecordModal = ({ setShowRecordModal, record }: RecordModalProps) => {
  const { putApi, deleteApi } = customApi("/api/users/records");

  const queryClient = useQueryClient();

  const deleteMutate = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ]);
      setShowRecordModal(false);
    },
  });

  const updateMutate = useMutation([RECORDS_UPDATE], putApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  // 기록 삭제
  const [confirmDelete, setConfirmDelete] = useState(-1);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, recordId: number) => {
    if (confirmDelete !== -1) {
      deleteMutate.mutate({ id: confirmDelete });
    } else {
      setConfirmDelete(recordId);
    }
  };

  // 기록 수정
  const [textArea, setTextArea] = useState<string | undefined>("");
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
  };

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<RecordUpdateType>({
    reValidateMode: "onSubmit",
    defaultValues: {
      updateWrite: modalRecord!.description,
    },
  });

  const onValid: SubmitHandler<RecordUpdateType> = ({ updateWrite }) => {
    setShowMsg(true);
    updateMutate.mutate({ id: modalRecord.id, position: modalRecord!.position, description: updateWrite });
    setTimeout(() => {
      setShowMsg(false);
    }, 2000);
  };

  return (
    <ModalBox>
      <Dim onClick={() => setShowRecordModal(false)} />
      <Modal>
        <ScrollContainer>
          <RecordDetailContainer>
            <ButtonBox>
              <CircleDeleteButton
                onClick={e => handleClick(e, record!.id)}
                recordId={record!.id}
                className={confirmDelete === record!.id ? "active" : ""}
                onBlur={() => setConfirmDelete(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
                <span>삭제하시겠습니까?</span>
              </CircleDeleteButton>
              <RoundButton
                onClick={() => setShowRecordModal(false)}
                size="custom"
                bgColor="rgb(198,205,250)"
                textColor="#5D6BB2"
                boxShadow={false}
                height="40px"
                padding="0 40px"
              >
                닫기
              </RoundButton>
            </ButtonBox>
            <Time byUser={record!.type === "user"}>
              {format(new Date(record!.createAt), "yyyy년 M월 d일 EEEE aaaa h시 m분", { locale: ko })}
            </Time>
            <EditTextBox onSubmit={handleSubmit(onValid)}>
              <TextArea
                {...register("updateWrite", {
                  required: "증상을 입력해주세요",
                })}
                onChange={handleTextChange}
                onFocus={() => setShowMsg(false)}
              >
                {record!.description}
              </TextArea>
              <RoundButton size="sm" bgColor="rgb(83,89,233)" boxShadow={false}>
                수정하기
              </RoundButton>
              {showMsg && <SuccessMsg>수정이 완료되었습니다!</SuccessMsg>}
              {errors.updateWrite && <ErrorMsg>{errors.updateWrite.message}</ErrorMsg>}
            </EditTextBox>
            <ManageImage recordId={String(record.id)} recordImage={record.images} />
          </RecordDetailContainer>
        </ScrollContainer>
      </Modal>
    </ModalBox>
  );
};

export default RecordModal;

const ModalBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  opacity: 0;
  animation: ${showFrame} 0.3s forwards;
`;

const Dim = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const Modal = styled.div`
  position: relative;
  z-index: 3;
  width: 800px;
  height: 780px;
  border-radius: 40px;
  margin: auto;
  overflow: hidden;
  background: ${({ theme }) => theme.color.white};
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 30px;
  }
  &::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #4449c2;
    background-clip: content-box;
    border: 10px solid transparent;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #363cbf;
    background-clip: content-box;
    border: 10px solid transparent;
  }
`;

const RecordDetailContainer = styled.div`
  padding: 30px 40px 40px 70px;
`;

const Time = styled.div<{ byUser: boolean }>`
  position: relative;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;

  &:after {
    content: "";
    position: absolute;
    top: calc(10px + 6px);
    left: calc(-20px - 8px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    ${({ byUser }) =>
      byUser
        ? css`
            box-sizing: border-box;
            background: #fff;
            border: 4px solid #5359e9;
          `
        : css`
            background: #03e7cb;
          `}
  }
`;

const EditTextBox = styled.form`
  position: relative;
  margin-bottom: 50px;

  & > * {
    margin: 0 auto 5px;
  }
`;

const TextArea = styled.textarea`
  background: #ebecfc;
  border: 0;
  resize: none;
  border-radius: 20px;
  width: 100%;
  min-height: 140px;
  padding: 20px 30px;

  &:focus {
    outline: 2px solid #8c9af3;
  }
`;

const SuccessMsg = styled.span`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #4449c2;
`;

const ErrorMsg = styled(SuccessMsg)`
  color: ${({ theme }) => theme.color.error};
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CircleDeleteButton = styled.button<{ recordId: number }>`
  position: relative;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.error};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  transition: background 0.4s, width 0.4s;

  svg {
    width: 22px;
    height: 22px;
    fill: ${({ theme }) => theme.color.white};
    transition: transform 0.4s;
  }

  span {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-95%, -50%);
    width: 120px;
    z-index: -1;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.error};
    opacity: 0;
    transition: opacity 0.4s, zIndex 0.4s, transform 0.4s;
  }

  &:hover {
    background: ${({ theme }) => theme.color.white};

    svg {
      fill: ${({ theme }) => theme.color.error};
    }
  }

  &.active {
    background: ${({ theme }) => theme.color.white};

    svg {
      fill: ${({ theme }) => theme.color.error};
    }

    span {
      opacity: 1;
      z-index: 1;
      transform: translate(-105%, -50%);
    }
`;
