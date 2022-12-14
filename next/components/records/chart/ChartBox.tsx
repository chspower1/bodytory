import styled, { css } from "styled-components";
import { changeDate } from "@utils/client/changeDate";
import RecordModal, { RecordWithImage } from "@components/modals/RecordModal";
import { RECORDS_DELETE, RECORDS_READ } from "constant/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { RecordWithImageAndHospital } from "./ChartTimeline";
import uploadImage from "@utils/client/uploadImage";
import DeleteBtn from "@components/layout/buttons/DeleteBtn";
import { AnimatePresence } from "framer-motion";
import IconAddImage from "@src/assets/icons/icon_addImage.png";
import customApi from "@utils/client/customApi";
import SplitTextByKeyword from "./SplitTextByKeyword";
import { DeleteBtnBox } from "@components/my-hospital/HospitalContent";

interface ChartBoxProps {
  index: number;
  record: RecordWithImageAndHospital;
  clickedKeyword: string | null;
  patientId: number | null;
  position: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChartBox = ({ index, record, clickedKeyword, patientId, position, setShowModal }: ChartBoxProps) => {
  const queryClient = useQueryClient();
  const { deleteApi } = customApi(`/api/users/records`);
  const { deleteApi: deleteHospitalRecordApi } = customApi(`/api/hospital/records`);
  const { postApi } = customApi("/api/users/records/picture");
  const { mutate } = useMutation([RECORDS_DELETE], deleteApi, {
    onSuccess() {
      console.log("hji");
      queryClient.invalidateQueries();
    },
  });
  const { mutate: deleteMutate } = useMutation(["removeHospitalRecode"], deleteHospitalRecordApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ, position]);
    },
  });

  // 이미지 업로드
  const { mutate: uploadImageMutate } = useMutation(postApi, {
    onSuccess() {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  // 상세 모달
  const [showRecordModal, setShowRecordModal] = useState(-1);
  const handleRecordModal = (record: RecordWithImage) => {
    setShowRecordModal(record.id);
  };
  return (
    <ChartBoxWrapper key={index}>
      <Time byUser={record.type === "user"}>{changeDate(record.createAt)}</Time>
      {record.type === "user" ? (
        <>
          <Content>
            <Description cursorType={"pointer"}>
              <Text onClick={() => handleRecordModal(record)}>
                {record.description.includes("\n") ? (
                  record.description
                    .split("\n")
                    .map((ele, idx) => (
                      <p key={`${ele} + ${idx} + ${Date.now()}`}>
                        {clickedKeyword && ele.includes(clickedKeyword) ? (
                          <SplitTextByKeyword text={ele} clickedKeyword={clickedKeyword} />
                        ) : (
                          ele
                        )}
                      </p>
                    ))
                ) : clickedKeyword && record.description.includes(clickedKeyword) ? (
                  <SplitTextByKeyword text={record.description} clickedKeyword={clickedKeyword} />
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
                    onClick={() => (patientId ? handleRecordModal(record) : uploadImage(record.id, uploadImageMutate))}
                  >
                    <span className="blind">사진 추가</span>
                  </UploadImageButton>
                )}
              </ImageBox>
            </Description>
            {!Boolean(patientId) && <DeleteBtn id={record.id} mutate={mutate} setShowAlertModal={setShowModal} />}
          </Content>
          <AnimatePresence>
            {showRecordModal === record.id && (
              <RecordModal record={record} isHospital={Boolean(patientId)} onClose={() => setShowRecordModal(-1)} setShowAlertModal={setShowModal} />
            )}
          </AnimatePresence>
        </>
      ) : (
        <Content>
          <Description cursorType={"auto"}>
            <HospitalName>
              {record.hospital?.name}
              {Boolean(patientId) && (
                <DeleteBtnBox>
                  <DeleteBtn
                    isdowntext={1}
                    mutate={deleteMutate}
                    setShowAlertModal={setShowModal}
                    id={record.id}
                    backgroundColor="rgb(100, 106, 235)"
                    isCircle
                  />
                </DeleteBtnBox>
              )}
            </HospitalName>
            <ResultTable>
              <TableRow>
                <Subject>진단 결과</Subject>
                <div>
                  {clickedKeyword && record.diagnosis?.includes(clickedKeyword) ? (
                    <SplitTextByKeyword text={record.diagnosis} clickedKeyword={clickedKeyword} />
                  ) : (
                    record.diagnosis
                  )}
                </div>
              </TableRow>
              <TableRow>
                <Subject>처방 내용</Subject>
                <div>
                  {clickedKeyword && record.prescription?.includes(clickedKeyword) ? (
                    <SplitTextByKeyword text={record.prescription} clickedKeyword={clickedKeyword} />
                  ) : (
                    record.prescription
                  )}
                </div>
              </TableRow>
              <TableRow>
                <Subject>상세 소견</Subject>
                <div>
                  {record.description.includes("\n") ? (
                    record.description
                      .split("\n")
                      .map((ele, idx) => (
                        <p key={`${ele} + ${idx} + ${Date.now()}`}>
                          {clickedKeyword && ele.includes(clickedKeyword) ? (
                            <SplitTextByKeyword text={ele} clickedKeyword={clickedKeyword} />
                          ) : (
                            ele
                          )}
                        </p>
                      ))
                  ) : clickedKeyword && record.description.includes(clickedKeyword) ? (
                    <SplitTextByKeyword text={record.description} clickedKeyword={clickedKeyword} />
                  ) : (
                    record.description
                  )}
                </div>
              </TableRow>
            </ResultTable>
          </Description>
        </Content>
      )}
    </ChartBoxWrapper>
  );
};
export default ChartBox;

const ChartBoxWrapper = styled.div`
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

  .keyword-mark {
    background: linear-gradient(to top, rgba(18, 212, 201, 0.4) 50%, transparent 50%);
  }
`;

const Text = styled.div`
  min-height: 140px;
  padding: 20px 200px 20px 30px;
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
  position: relative;
  background: #4b50d3;
  color: ${({ theme }) => theme.color.white};
  font-weight: 500;
  padding: 15px 30px;
`;

const ResultTable = styled.div`
  padding: 30px 40px;
`;

const Subject = styled.div`
  flex-shrink: 0;
  font-weight: 600;
  margin-right: 60px;
  height: 48px;
  display: flex;
  align-items: center;
`;

const TableRow = styled.div`
  display: flex;

  & + & {
    margin-top: 15px;
  }

  ${Subject} + div {
    width: 100%;
    padding: 10px 0;
    border-radius: 5px;
  }
`;
