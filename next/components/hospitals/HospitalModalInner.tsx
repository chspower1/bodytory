import { RoundButton } from "@components/buttons/Button";
import Input from "@components/Input";
import { Subject } from "@components/modals/ClinicModal";
import Textarea from "@components/Textarea";
import { theme } from "@styles/theme";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface HospitalRecordType {
  nowDate: string;
  result: string;
  content: string;
  detail: string;
}

const HospitalModalInner = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HospitalRecordType>();
  const onValid: SubmitHandler<HospitalRecordType> = ({ nowDate, result, content, detail }) => {};
  return (
    <InnerBox>
      <Form onSubmit={handleSubmit(onValid)}>
        <InnerHeader>
          <Auth>
            <h3>{"어드민"}</h3>
            <span>{"남, 만 24세"}</span>
          </Auth>
          <Position>
            <span>손목</span>
            부위
          </Position>
        </InnerHeader>
        <InnerContent>
          <ul>
            <ContentLi>
              <SubjectName>진료일시</SubjectName>
              <div className="currentDate">2022년 11월 09일 일요일 오후 5시 52분</div>
            </ContentLi>
            <ContentLi>
              <SubjectName>진단결과</SubjectName>
              <Input register={register("result")} placeholder="진단결과를 입력해주세요" />
            </ContentLi>
            <ContentLi>
              <SubjectName>처방내용</SubjectName>
              <Input register={register("content")} placeholder="처방내용 입력해주세요" />
            </ContentLi>
            <ContentLi>
              <SubjectName>상세소견</SubjectName>
              <Textarea register={register("detail")} placeholder="상세 소견을 입력해주세요"></Textarea>
            </ContentLi>
          </ul>
        </InnerContent>
        <RoundButton size="sm" bgColor={theme.color.mintBtn}>
          작성완료
        </RoundButton>
      </Form>
    </InnerBox>
  );
};

export default HospitalModalInner;

const InnerBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 80px 40px 60px;

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
`;
const Auth = styled.div`
  display: flex;
  align-items: center;
  h3 {
    font-size: 30px;
    margin-right: 30px;
  }
`;
const Position = styled.div`
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
const InnerContent = styled.div``;

const ContentLi = styled.li`
  display: flex;
  input {
    background: rgba(217, 222, 255, 1);
    text-align: left;
    color: #232323;
  }

  & + & {
    margin-top: 30px;
  }
`;
