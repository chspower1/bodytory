import styled from "styled-components";
import mic from "@public/static/mic.png";
import recordConfirm from "@public/static/recordConfirm.png";
import recordList from "@public/static/recordList.png";
import recordRecomend from "@public/static/recordRecomend.png";
import map from "@public/static/map.png";
import share from "@public/static/share.png";
import medicalRecord from "@public/static/MedicalRecord.png";
import Image from "next/image";

const Tory = () => {
  return (
    <Container>
      <FirstSection>
        <ServiceIntro>
          <HighlightText>바디토리</HighlightText>
          <NormalText>는 이용자님의 건강관리를 위한 인공지능 헬스케어 서비스입니다</NormalText>
        </ServiceIntro>
        <RecordIntro>
          <TextBox>
            <HighlightText>오늘 기록하기</HighlightText>
            <NormalText>음성인식 기술을 활용하여 누구나 쉽게 오늘의 건강상태를 기록해요</NormalText>
          </TextBox>
          <Image src={mic} width={500} height={500} alt="mic"></Image>
        </RecordIntro>
      </FirstSection>
      <SecondSection>
        <RecordConfirmIntro>
          <Image src={recordConfirm} alt="mic"></Image>
          <TextBox>
            <HighlightText>기록 확인하기</HighlightText>
            <NormalText>최근 나의 건강상태 통계를 한눈에 볼 수 있어요</NormalText>
          </TextBox>
        </RecordConfirmIntro>
        <RecordChartIntro>
          <TextBox>
            <NormalText>기록된 증상들은 깔끔하게 정리하고 분류해서 한눈에 보기 쉬운 증상차트를 제공해요</NormalText>
          </TextBox>
          <Image src={recordList} alt="mic"></Image>
        </RecordChartIntro>
        <RecordRecomendIntro>
          <TextBox>
            <NormalText>
              A.I 토리가 기록된 증상을 분석하여 나에게 적합한 진료과목과 내 근처 병원을 추천해줘요!
            </NormalText>
          </TextBox>
          <Image src={recordRecomend} alt="mic"></Image>
        </RecordRecomendIntro>
      </SecondSection>
      <ThirdSection>
        <ManageHospitalIntro>
          <Image src={map} alt="mic"></Image>
        </ManageHospitalIntro>
        <ManageShareIntro>
          <Image src={share} alt="mic"></Image>
        </ManageShareIntro>
        <MedicalRecordIntro>
          <Image src={medicalRecord} alt="mic"></Image>
        </MedicalRecordIntro>
      </ThirdSection>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
const FirstSection = styled.section`
  background-color: #f2f3ff;
  padding: 0 200px;
`;
const ServiceIntro = styled.div`
  width: 1500px;
  height: 600px;
`;
const RecordIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
`;
const SecondSection = styled.section`
  background-color: #e7e8ff;
  padding: 0 200px;
`;
const RecordConfirmIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordChartIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordRecomendIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ThirdSection = styled.section`
  background-color: #f2f3ff;
  padding: 0 200px;
`;
const ManageHospitalIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
`;
const ManageShareIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
`;
const MedicalRecordIntro = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: space-between;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const NormalText = styled.span`
  font-size: 30px;
`;
const HighlightText = styled.span`
  font-size: 42px;
  color: #8e92f2;
`;

export default Tory;
