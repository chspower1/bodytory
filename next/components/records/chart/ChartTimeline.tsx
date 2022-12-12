import { Position, Record, RecordImage } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import {
  AI_RESULT_READ,
  BODYPART_CHARTDATA_READ,
  KEYWORDS_CHARTDATA_READ,
  RECORDS_DELETE,
  RECORDS_READ,
} from "constant/queryKeys";
import React, { ChangeEvent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { uploadImageApi } from "@utils/client/imageApi";
import uploadImage from "@utils/client/uploadImage";
import IconAddImage from "@src/assets/icons/icon_addImage.png";
import ToriQuestion from "@src/assets/icons/toriQuestion.png";
import RecordModal, { RecordWithImage } from "@components/modals/RecordModal";
import { KoreanPosition } from "types/write";
import { useRouter } from "next/router";
import checkIcon from "@src/assets/icons/icon_checkbox.png";
import checkedIcon from "@src/assets/icons/checkbox_checked.png";
import { changeDate } from "@utils/client/changeDate";
import DeleteBtn from "@components/layout/buttons/DeleteBtn";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPatientInfo, selectedKeyword } from "atoms/atoms";
import { Subject } from "@components/modals/ClinicModal";
import RecordSkeleton from "@components/skeletonUI/RecordSkeleton";
import { AnimatePresence } from "framer-motion";

export interface RecordWithImageAndHospital extends Record {
  images: RecordImage[];
  hospital?: { name: string };
}

const ChartTimeline = () => {
  const { query } = useRouter();
  const position = query.position as Position;
  const { name: patientName, id: patientId } = useRecoilValue(currentPatientInfo);
  const queryClient = useQueryClient();
  const { getApi } = customApi(patientId ? `/api/hospital/${patientId}/${position}` : `/api/users/records/${position}`);
  const { deleteApi } = customApi(`/api/users/records`);

  // 여기 key 2개 넣고, useEffect까지 써야지 되는 이 부분 나중에 리팩토링하기 (일단 기능은 맞게 동작)
  const { isLoading, data } = useQuery<RecordWithImageAndHospital[] | undefined>([RECORDS_READ, position], getApi, {
    onSuccess(data) {
      setRecords(data);
    },
    enabled: !!position,
  });
  useEffect(() => {
    queryClient.invalidateQueries([RECORDS_READ, position]);
    setFilterItem("all"); // 부위마다 새로운 페이지가 아닌가..? 왜 이걸 해줘야하지
    setClickedKeyword(null);
  }, [position]);

  const [records, setRecords] = useState<RecordWithImageAndHospital[] | undefined>();

  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ, position]);
      queryClient.invalidateQueries([AI_RESULT_READ]);
      queryClient.invalidateQueries([BODYPART_CHARTDATA_READ]);
      queryClient.invalidateQueries([KEYWORDS_CHARTDATA_READ]);
    },
  });

  // 이미지 업로드
  const uploadImageMutation = useMutation(uploadImageApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  // 상세 모달
  const [showRecordModal, setShowRecordModal] = useState(-1);

  const handleRecordModal = (record: RecordWithImage) => {
    setShowRecordModal(record.id);
  };

  // 모아보기 필터링
  const [filterItem, setFilterItem] = useState<string>("all");
  const [filtredRecord, setFiltredRecord] = useState<RecordWithImageAndHospital[] | undefined>();

  const handleRadioChange = (event: any) => {
    setFilterItem(event.target.value);
  };

  useEffect(() => {
    setFiltredRecord(records);
  }, [records]);

  useEffect(() => {
    if (filterItem === "all") {
      setFiltredRecord(records);
    } else {
      setFiltredRecord(records?.filter(record => record.type === filterItem));
    }
  }, [filterItem]);

  // 키워드 핕터링
  const [clickedKeyword, setClickedKeyword] = useRecoilState(selectedKeyword);
  const [filtredRecordByKeywrod, setFiltredRecordByKeywrod] = useState<RecordWithImageAndHospital[] | undefined>();

  useEffect(() => {
    if (clickedKeyword) {
      setFiltredRecordByKeywrod(filtredRecord?.filter(record => record.description.includes(clickedKeyword)));
    } else {
      setFiltredRecordByKeywrod(filtredRecord);
    }
  }, [clickedKeyword, filtredRecord]);

  return (
    <>
      <TimelineContainer>
        <Timeline>
          <Filter>
            <div>
              <input
                type="radio"
                name="filter"
                id="all"
                value="all"
                onChange={handleRadioChange}
                checked={filterItem === "all"}
              />
              <label htmlFor="all">
                <i />
                전체
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="user"
                value="user"
                onChange={handleRadioChange}
                checked={filterItem === "user"}
              />
              <label htmlFor="user">
                <i />
                증상기록 모아보기
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="hospital"
                value="hospital"
                onChange={handleRadioChange}
                checked={filterItem === "hospital"}
              />
              <label htmlFor="hospital">
                <i />
                병원기록 모아보기
              </label>
            </div>
          </Filter>
          {filtredRecordByKeywrod?.length === 0 ? (
            <NoRecord>
              <img src={ToriQuestion.src} />
              <p>
                <strong>{KoreanPosition[position!]}</strong>에 대한 기록이 없습니다
              </p>
            </NoRecord>
          ) : !query.position ? (
            <NoRecord>
              <img src={ToriQuestion.src} />
              <p>자세한 기록을 확인하고 싶은 부위를 선택해주세요</p>
            </NoRecord>
          ) : isLoading ? (
            <RecordSkeleton />
          ) : (
            filtredRecordByKeywrod?.map((record, index) => (
              <RecordBox key={index}>
                <Time byUser={record.type === "user"}>{changeDate(record.createAt)}</Time>
                {record.type === "user" ? (
                  <>
                    <Content>
                      <Description cursorType={"pointer"}>
                        <Text onClick={() => handleRecordModal(record)}>
                          {clickedKeyword && record.description.includes(clickedKeyword) ? (
                            <>
                              {record.description.split(clickedKeyword).map((text, idx, arr) =>
                                idx === arr.length - 1 ? (
                                  <span>{text}</span>
                                ) : (
                                  <span>
                                    {text}
                                    <span className="keyword-mark">{clickedKeyword}</span>
                                  </span>
                                ),
                              )}
                            </>
                          ) : (
                            record.description
                          )}
                        </Text>
                        <ImageBox isHospital={Boolean(patientId)}>
                          {record.images.length ? (
                            <Thumbnail onClick={() => handleRecordModal(record)}>
                              <ThumbnailImage src={record.images[0].url} />
                              {record.images.length > 1 && <span>+{record.images.length - 1}장</span>}
                            </Thumbnail>
                          ) : (
                            <UploadImageButton
                              onClick={() =>
                                patientId
                                  ? handleRecordModal(record)
                                  : uploadImage(String(record.id), uploadImageMutation.mutate)
                              }
                            >
                              <span className="blind">사진 추가</span>
                            </UploadImageButton>
                          )}
                        </ImageBox>
                      </Description>
                      {!Boolean(patientId) && <DeleteBtn id={record.id} mutate={mutate} />}
                    </Content>
                    <AnimatePresence>
                      {showRecordModal === record.id && (
                        <RecordModal
                          record={record}
                          isHospital={Boolean(patientId)}
                          onClose={() => setShowRecordModal(-1)}
                        />
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Content>
                    <Description cursorType={"auto"}>
                      <HospitalName>{record.hospital?.name}</HospitalName>
                      <ResultTable>
                        <TableRow>
                          <Subject>진단 결과</Subject>
                          <p>{record.diagnosis}</p>
                        </TableRow>
                        <TableRow>
                          <Subject>처방 내용</Subject>
                          <p>{record.prescription}</p>
                        </TableRow>
                        <TableRow>
                          <Subject>상세 소견</Subject>
                          <p>
                            {record.description.includes("\n")
                              ? record.description.split("\n").map((ele, idx) => (
                                  <React.Fragment key={`${ele} + ${idx} + ${Date.now()}`}>
                                    {ele}
                                    <br />
                                  </React.Fragment>
                                ))
                              : record.description}
                          </p>
                        </TableRow>
                      </ResultTable>
                    </Description>
                  </Content>
                )}
              </RecordBox>
            ))
          )}
        </Timeline>
      </TimelineContainer>
    </>
  );
};

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

  & > div {
    margin: 0 10px;
  }

  label {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #b2b5cc;
    cursor: pointer;
    transition: color 0.2s;

    i {
      display: block;
      width: 16px;
      height: 16px;
      background: url(${checkIcon.src}) no-repeat 50% 50% / cover;
      margin-right: 5px;
      transition: background 0.2s, opacity 0.2s;
    }

    &:hover {
      color: #82859c;

      i {
        background-image: url(${checkedIcon.src});
        opacity: 0.35;
      }
    }
  }

  input {
    position: absolute;
    left: -999999%;

    &:checked + label {
      color: ${({ theme }) => theme.color.text};
      pointer-events: none;

      i {
        background-image: url(${checkedIcon.src});
      }
    }
  }
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

const Description = styled.div<{ cursorType: string }>`
  position: relative;
  background: #ebecfc;
  border-radius: 20px;
  overflow: hidden;
  cursor: ${({ cursorType }) => cursorType};
`;

const Text = styled.div`
  min-height: 140px;
  padding: 20px 200px 20px 30px;

  .keyword-mark {
    background: linear-gradient(to top, rgba(18, 212, 201, 0.4) 50%, transparent 50%);
  }
`;

const ImageBox = styled.div<{ isHospital: boolean }>`
  position: absolute;
  top: 50%;
  right: 90px;
  transform: translate(0, -50%);
  width: 80px;
  height: 80px;
  border-radius: 15px;
  overflow: hidden;
  ${({ isHospital }) =>
    isHospital &&
    css`
      right: 50px;
    `}
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
`;

const HospitalName = styled.div`
  background: #4b50d3;
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  padding: 15px 30px;
`;

const ResultTable = styled.div`
  padding: 30px 40px;
`;

const TableRow = styled.div`
  display: flex;

  & + & {
    margin-top: 15px;
  }

  div + p {
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
  }
`;

export default ChartTimeline;
