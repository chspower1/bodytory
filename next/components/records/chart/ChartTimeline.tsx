import { Position, Record, RecordImage } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { RECORDS_READ } from "constant/queryKeys";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ToriQuestion from "@src/assets/icons/toriQuestion.png";
import { KoreanPosition } from "types/write";
import { useRouter } from "next/router";
import checkIcon from "@src/assets/icons/icon_checkbox.png";
import checkedIcon from "@src/assets/icons/checkbox_checked.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPatientInfo, selectedKeyword } from "atoms/atoms";
import RecordSkeleton from "@components/skeletonUI/RecordSkeleton";
import ChartBox from "./ChartBox";
import AlertModal from "@components/modals/AlertModal";
import { DeleteBtnBox } from "@components/my-hospital/HospitalContent";

export interface RecordWithImageAndHospital extends Record {
  images: RecordImage[];
  hospital?: { name: string };
}

const ChartTimeline = () => {
  const { query } = useRouter();
  const position = query.position as Position;
  const { id: patientId } = useRecoilValue(currentPatientInfo);
  const queryClient = useQueryClient();
  const { getApi } = customApi(patientId ? `/api/hospital/${patientId}/${position}` : `/api/users/records/${position}`);
  const [showModal, setShowModal] = useState(false);
  // 여기 key 2개 넣고, useEffect까지 써야지 되는 이 부분 나중에 리팩토링하기 (일단 기능은 맞게 동작)
  const { isLoading } = useQuery<RecordWithImageAndHospital[] | undefined>([RECORDS_READ, position], getApi, {
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
  const [filtredRecordByKeyword, setFiltredRecordByKeyword] = useState<RecordWithImageAndHospital[] | undefined>();

  useEffect(() => {
    if (clickedKeyword) {
      setFiltredRecordByKeyword(filtredRecord?.filter(record => record.description.includes(clickedKeyword) || record.diagnosis?.includes(clickedKeyword) || record.prescription?.includes(clickedKeyword)));
    } else {
      setFiltredRecordByKeyword(filtredRecord);
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
          {filtredRecordByKeyword?.length === 0 ? (
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
            filtredRecordByKeyword?.map((record, index) => (
              <ChartBox
                index={index}
                record={record}
                clickedKeyword={clickedKeyword}
                patientId={patientId}
                position={position}
                setShowModal={setShowModal}
              />
            ))
          )}
        </Timeline>
        <AlertModal show={showModal} onClose={() => setShowModal(false)} />
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

export default ChartTimeline;
