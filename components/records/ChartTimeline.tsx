import { Record, RecordImage } from "@prisma/client";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { RECORDS_DELETE, RECORDS_READ } from "constant/queryKeys";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { uploadImageApi } from "@utils/client/imageApi";
import uploadImage from "@utils/client/uploadImage";
import IconAddImage  from "@public/static/icon/icon_addImage.png";
import ToriQuestion from "@public/static/icon/toriQuestion.png";
import RecordModal from "@components/Modal/RecordModal";
import { useRecoilValue } from "recoil";
import { selectedBodyPart } from "atoms/atoms";
import { KoreanPosition } from "types/write";

interface RecordWithImage extends Record {
  images: RecordImage[];
}

function ChartTimeline() {
  
  const { getApi, deleteApi } = customApi("/api/users/records");
  const { isLoading, data: records } = useQuery<RecordWithImage[] | undefined>([RECORDS_READ], getApi);

  const selectedPart = useRecoilValue(selectedBodyPart);
  const recordsByPosition = records?.filter((record, index) => record.position === selectedPart);

  const queryClient = useQueryClient();
  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(-1);  // 삭제 버튼 한번 눌렀을때
  const [currentIdx, setCurrentIdx] = useState(-1);  // 삭제버튼 두번 눌렀을때
  const DelButtonRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>;
  
  useEffect(()=>{
    if(currentIdx === confirmDelete){
      mutate({ id: confirmDelete });
      setConfirmDelete(-1);
    }
  },[currentIdx]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, recordId: number) => {
    if(confirmDelete !== -1){
      setCurrentIdx(recordId);
    }else{
      setConfirmDelete(recordId);
    }
  }

  console.log(records);

  const uploadImageMutation = useMutation(uploadImageApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const handleShowModal = () => {

  }


  return (
    <>
      <TimelineContainer>
        {
          recordsByPosition?.length !== 0 && (
            <Filter>
              <span>전체</span>
              <span>증상기록 모아보기</span>
              <span>병원방문 모아보기</span>
            </Filter>
          )
        }
        <Timeline>
          {
            recordsByPosition?.length === 0 ? (
              <NoRecord>
                <img src={ToriQuestion.src} />
                <p><strong>{KoreanPosition[selectedPart!]}</strong>에 대한 기록이 없습니다</p>
              </NoRecord>
            ) : (
              recordsByPosition?.map((record, index) => (
                <RecordBox key={index}>
                  <Time>{format(new Date(record.createAt), "yyyy년 M월 d일 EEEE aaaa h시 m분", {locale: ko})}</Time>
                  <Content>
                    <Description onClick={handleShowModal}>
                      <Text>
                        {record.description}
                      </Text>
                      <Image>
                        {
                          record.images.length ? 
                            <Thumbnail>
                              <ThumbnailImage src={record.images[0].url} />
                              {
                                record.images.length > 1 && (
                                  <span>+{record.images.length - 1}장</span>
                                )
                              }
                            </Thumbnail> : 
                            <UploadImageButton onClick={() => uploadImage(String(record.id), uploadImageMutation.mutate)}>
                              <span>사진 추가</span>
                            </UploadImageButton>
                        }
                      </Image>
                    </Description>
                    <DeleteButton onClick={(e) => handleClick(e, record.id)} ref={DelButtonRef} recordId={record.id} className={confirmDelete === record.id ? "delActive" : ""} onBlur={() =>setConfirmDelete(-1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                      </svg>
                      <span>삭제</span>
                    </DeleteButton>
                  </Content>
                </RecordBox>
              ))
            )
          }
        </Timeline>
      </TimelineContainer>
      {/* <RecordModal/> */}
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

const Timeline = styled.div`
`;

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

const Time = styled.div`
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
    background: ${({ theme }) => theme.color.darkBg};
  }
`;

const Content = styled.div`
  position: relative;
`;

const Description = styled.div`
  position: relative;
  background: #ebecfc;
  border-radius: 20px;
`;

const Text = styled.div`
  min-height: 140px;
  padding: 20px 200px 20px 30px;
  cursor: pointer;
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
  background: #D7D9F6 url(${IconAddImage.src}) no-repeat 50% 50%/50%;
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

  &.delActive {
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

export default ChartTimeline;
