import { Record, RecordImage } from "@prisma/client";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { RECORDS_DELETE, RECORDS_READ, RECORDS_UPDATE } from "constant/queryKeys";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { uploadImageApi } from "@utils/client/imageApi";
import uploadImage from "@utils/client/uploadImage";
import IconAddImage from "@public/static/icon/icon_addImage.png";
import ToriQuestion from "@public/static/icon/toriQuestion.png";
import RecordModal from "@components/Modal/RecordModal";
import { useRecoilValue } from "recoil";
import { selectedBodyPart } from "atoms/atoms";
import { KoreanPosition } from "types/write";
import ManageImage from "@components/ManageImage";
import { RoundButton } from "@components/button/Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecordWithImage extends Record {
  images: RecordImage[];
}

interface RecordUpdateType {
  updateText: string;
}

function ChartTimeline() {
  const { getApi, putApi, deleteApi } = customApi("/api/users/records");
  const { isLoading, data: records } = useQuery<RecordWithImage[] | undefined>([RECORDS_READ], getApi);

  const selectedPart = useRecoilValue(selectedBodyPart);
  const recordsByPosition = records?.filter((record, index) => record.position === selectedPart);

  const queryClient = useQueryClient();
  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const { mutate: editMutate } = useMutation([RECORDS_UPDATE], putApi, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RecordUpdateType>({
    reValidateMode: "onSubmit",
  });
  const onValid: SubmitHandler<RecordUpdateType> = ({ updateText }) => {
    editMutate({ id: recordDetail.id, position: recordDetail.position, description: updateText });
    setCurrentIdx(-1);
  };

  const [confirmDelete, setConfirmDelete] = useState(-1); // 삭제 버튼 한번 눌렀을때
  const [currentIdx, setCurrentIdx] = useState(-2); // 삭제버튼 두번 눌렀을때

  const [showModal, setShowModal] = useState(false);
  const [recordDetail, setRecordDetail] = useState<any>(null);

  useEffect(() => {
    if (currentIdx === confirmDelete) {
      mutate({ id: confirmDelete });
      setConfirmDelete(-1);
    }
  }, [currentIdx]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, recordId: number) => {
    if (confirmDelete !== -1) {
      setCurrentIdx(recordId);
    } else {
      setConfirmDelete(recordId);
    }
  };

  const uploadImageMutation = useMutation(uploadImageApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const handleShowModal = (record: any) => {
    setShowModal(true);
    setRecordDetail(record);
  };

  return (
    <>
      <TimelineContainer>
        {recordsByPosition?.length !== 0 && (
          <Filter>
            <span>전체</span>
            <span>증상기록 모아보기</span>
            <span>병원방문 모아보기</span>
          </Filter>
        )}
        <Timeline>
          {recordsByPosition?.length === 0 ? (
            <NoRecord>
              <img src={ToriQuestion.src} />
              <p>
                <strong>{KoreanPosition[selectedPart!]}</strong>에 대한 기록이 없습니다
              </p>
            </NoRecord>
          ) : (
            recordsByPosition?.map((record, index) => (
              <RecordBox key={index}>
                <Time byUser={record.type === "user"}>
                  {format(new Date(record.createAt), "yyyy년 M월 d일 EEEE aaaa h시 m분", { locale: ko })}
                </Time>
                <Content>
                  <Description>
                    <Text onClick={() => handleShowModal(record)}>{record.description}</Text>
                    <Image>
                      {record.images.length ? (
                        <Thumbnail onClick={() => handleShowModal(record)}>
                          <ThumbnailImage src={record.images[0].url} />
                          {record.images.length > 1 && <span>+{record.images.length - 1}장</span>}
                        </Thumbnail>
                      ) : (
                        <UploadImageButton onClick={() => uploadImage(String(record.id), uploadImageMutation.mutate)}>
                          <span>사진 추가</span>
                        </UploadImageButton>
                      )}
                    </Image>
                  </Description>
                  <DeleteButton
                    onClick={e => handleClick(e, record.id)}
                    recordId={record.id}
                    className={confirmDelete === record.id ? "active" : ""}
                    onBlur={() => setConfirmDelete(-1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    <span>삭제</span>
                  </DeleteButton>
                </Content>
              </RecordBox>
            ))
          )}
        </Timeline>
      </TimelineContainer>

      { showModal && recordDetail && (
        <RecordModal setShowModal={setShowModal}>
          <ScrollContainer>
            <RecordDetailContainer>
              <ButtonBox>
                <CircleDeleteButton
                  onClick={e => handleClick(e, recordDetail.id)}
                  recordId={recordDetail.id}
                  className={confirmDelete === recordDetail.id ? "active" : ""}
                  onBlur={() => setConfirmDelete(-1)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                  <span>삭제하시겠습니까?</span>
                </CircleDeleteButton>
                <RoundButton
                  onClick={() => setShowModal(false)}
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
              <Time byUser={recordDetail.type === "user"}>
                {format(new Date(recordDetail.createAt), "yyyy년 M월 d일 EEEE aaaa h시 m분", { locale: ko })}
              </Time>
              <EditTextBox onSubmit={handleSubmit(onValid)}>
                <TextInput {...register("updateText", { required: "필수값입니다" })} value={recordDetail.description} />
                <RoundButton size="sm" bgColor="rgb(83,89,233)" boxShadow={false}>
                  수정완료
                </RoundButton>
              </EditTextBox>
              <ManageImage recordId={recordDetail.id} recordImage={recordDetail.images} />
            </RecordDetailContainer>
          </ScrollContainer>
        </RecordModal>
      )}
    </>
  );
}

const TimelineContainer = styled.div`
  position: relative;
  min-height: 500px;
  background: #f4f5ff;
  padding: 30px 40px;
  border-radius: 40px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const Timeline = styled.div``;

const NoRecord = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    display: block;
    width: 120px;
    margin: 0 auto 30px;
  }

  p {
    font-size: 20px;
    font-weight: 500;

    strong {
      font-weight: 700;
    }
  }
`;

const RecordBox = styled.div`
  position: relative;
  padding-left: 20px;

  &:before {
    content: "";
    position: absolute;
    top: 16px;
    left: 0;
    width: 1px;
    height: calc(100% + 40px);
    background: #363cbf;
  }

  &:last-child:before {
    display: none;
  }

  & + & {
    margin-top: 40px;
  }
`;

const Time = styled.div<{ byUser: boolean }>`
  position: relative;
  padding: 10px;
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

const Content = styled.div`
  position: relative;
`;

const Description = styled.div`
  position: relative;
  background: #ebecfc;
  border-radius: 20px;
  cursor: pointer;
`;

const Text = styled.div`
  min-height: 140px;
  padding: 20px 200px 20px 30px;
`;

const Image = styled.div`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translate(0, -50%);
  width: 80px;
  height: 80px;
  border-radius: 15px;
  overflow: hidden;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(87, 88, 120, 0.5);
    z-index: 1;
  }

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.color.white};
    font-size: 16px;
    font-weight: 500px;
    z-index: 5;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadImageButton = styled.button`
  width: 100%;
  height: 100%;
  background: #d7d9f6 url(${IconAddImage.src}) no-repeat 50% 50%/50%;
  cursor: pointer;

  span {
    overflow: hidden;
    border: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    display: inline-block;
  }
`;

const DeleteButton = styled.button<{ recordId: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  background: #d9deff;
  border-radius: 0 20px 20px 0;
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
    background: ${({ theme }) => theme.color.error};

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

// ====================== Detail Modal Style

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

  ${Time} {
    margin-bottom: 10px;
  }
`;

const EditTextBox = styled.form`
  margin-bottom: 50px;

  & > * {
    margin: 0 auto 5px;
  }
`;

const TextInput = styled.textarea`
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

export default ChartTimeline;
