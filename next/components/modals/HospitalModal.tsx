import { theme } from "@styles/theme";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Dim, ModalContainer, ModalWrapper } from "@styles/ModalStyled";
import { SubmitHandler, useForm } from "react-hook-form";
import { Subject } from "./ClinicModal";
import Input from "@components/layout/input/Input";
import Textarea from "@components/layout/input/Textarea";
import { Row } from "@styles/Common";
import getAmericanAge from "@utils/client/getAmericanAge";
import { KoreanPosition } from "types/write";
import { Position } from "@prisma/client";
import { changeDate } from "@utils/client/changeDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { RECORDS_READ } from "constant/queryKeys";
import usePortal from "@hooks/usePortal";
import { ModalButton } from "./RecordModal";

interface ModalType {
  show: boolean;
  onClose: () => void;
  name: string;
  gender: string;
  birth: string;
  position: Position;
  patientId: number;
}
interface HospitalRecordType {
  diagnosis: string;
  prescription: string;
  description: string;
}

const HospitalModal = ({ show, onClose, name, gender, birth, position, patientId }: ModalType) => {
  const Portal = usePortal();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<HospitalRecordType>();
  // 뮤테이트 랑 api 만들기
  const [isComplete, setIsComplete] = useState(false);
  const [dateNow, setDateNow] = useState<Date>();
  const { postApi } = customApi(`/api/hospital/records`);
  const { mutate } = useMutation(["hospitalAddRecordKey"], postApi, {
    onSuccess(data) {
      setIsComplete(true);
      queryClient.invalidateQueries([RECORDS_READ, position]);
    },
  });

  const onValid: SubmitHandler<HospitalRecordType> = ({ diagnosis, prescription, description }) => {
    mutate({ patientId, position, diagnosis, prescription, description, createAt: dateNow });
  };

  const handleClickReset = () => {
    onClose();
    reset();
    setIsComplete(false);
  };

  useEffect(() => {
    setDateNow(new Date());
  }, [show]);

  const modalContent = (
    <AnimatePresence>
      {show && (
        <ModalWrapper>
          <Dim onClick={onClose} />
          <ModalBox width={isComplete ? "auto" : "800px"} height="auto">
            {!isComplete ? (
              <InnerBox>
                <Form onSubmit={handleSubmit(onValid)}>
                  <InnerHeader>
                    <Auth>
                      <h3>{name}</h3>
                      <span>{`${gender === "male" ? "남" : "여"}, 만 ${getAmericanAge(birth)}세`}</span>
                    </Auth>
                    <PositionBox>
                      <span>{KoreanPosition[position]}</span>
                      부위
                    </PositionBox>
                  </InnerHeader>
                  <InnerContent>
                    <ul>
                      <ContentLi>
                        <SubjectName>진료일시</SubjectName>
                        <div className="currentDate">{changeDate(dateNow!)}</div>
                      </ContentLi>
                      <ContentLi>
                        <SubjectName>진단결과</SubjectName>
                        <Input
                          motion={false}
                          $light
                          register={register("diagnosis", { required: true })}
                          placeholder="진단결과를 입력해주세요"
                        />
                      </ContentLi>
                      <ContentLi>
                        <SubjectName>처방내용</SubjectName>
                        <Input
                          motion={false}
                          $light
                          register={register("prescription", { required: true })}
                          placeholder="처방내용 입력해주세요"
                        />
                      </ContentLi>
                      <ContentLi>
                        <SubjectName>상세소견</SubjectName>
                        <Textarea
                          register={register("description", { required: true })}
                          placeholder="상세 소견을 입력해주세요"
                        ></Textarea>
                      </ContentLi>
                    </ul>
                  </InnerContent>
                  <ButtonBox>
                    <ModalButton sm bgColor={theme.color.mintBtn}>
                      작성완료
                    </ModalButton>
                    <ModalButton type="button" sm bgColor="rgb(188, 197, 255)" onClick={handleClickReset}>
                      닫기
                    </ModalButton>
                  </ButtonBox>
                </Form>
              </InnerBox>
            ) : (
              <CompelteBox>
                <div>
                  <h2>알림</h2>
                </div>
                <div>진료내역 작성이 완료되었어요!</div>
                <div>
                  <ModalButton sm bgColor="rgb(188, 197, 255)" onClick={handleClickReset}>
                    닫기
                  </ModalButton>
                </div>
              </CompelteBox>
            )}
          </ModalBox>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );

  return Portal({ children: modalContent });
};

export default HospitalModal;


const ModalBox = styled(ModalContainer)`
  width: auto;
`

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 80px 40px 60px;

  button {
    margin: 0 auto;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const SubjectName = styled(Subject)`
  height: 62px;
  & + .currentDate {
    width: 500px;
    margin: auto;
  }
`;

const InnerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #bbb;
`;
const Auth = styled.div`
  display: flex;
  align-items: center;
  h3 {
    font-size: 30px;
    margin-right: 30px;
  }
`;
const PositionBox = styled.div`
  display: flex;
  align-items: center;
  span {
    padding: 3px 10px;
    background: ${({ theme }) => theme.color.darkBg};
    border-radius: 6px;
    color: ${({ theme }) => theme.color.white};
    margin-right: 10px;
  }
`;
const InnerContent = styled.div`
  padding: 30px 0;
`;

const ContentLi = styled.li`
  display: flex;
  input {
    text-align: left;
  }

  & + & {
    margin-top: 30px;
  }
`;

const ButtonBox = styled(Row)`
  padding: 20px 0;
  button {
    margin: 0 10px;
  }
`;

const CompelteBox = styled.div`
  min-width: 500px;
  padding: 30px 40px;
  > div {
    text-align: center;
    font-size: 20px;
    h2 {
      font-weight: 600;
      font-size: 24px;
    }
    button {
      margin: 0 auto;
      &:hover {
        background: ${({ theme }) => theme.color.input};
      }
    }
    & + div {
      margin-top: 60px;
    }
  }
`;
