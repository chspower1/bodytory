import styled from "styled-components";
import mic from "@public/static/mic.png";
import recordConfirm from "@public/static/recordConfirm.png";
import recordList from "@public/static/recordList.png";
import recordRecomend from "@public/static/recordRecomend.png";
import map from "@public/static/map.png";
import share from "@public/static/share.png";
import medicalRecord from "@public/static/medicalRecord.png";
import Image from "next/image";
import { RectangleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { animateFrom, hide } from "@utils/client/animateFrom";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);
const Tory = () => {
  const router = useRouter();
  useEffect(() => {
    gsap.utils.toArray(".gs_reveal").forEach(function (elem: any) {
      console.log(elem);
      ScrollTrigger.create({
        trigger: elem,
        start: "70% bottom",
        onEnter: () => {
          animateFrom(elem);
        },
        onLeaveBack: () => {
          hide(elem);
        },
        markers: true,
      });
    });
  }, []);

  return (
    <Container>
      <FirstSection>
        <ServiceIntro>
          <Image src={mic} width={151} height={240} alt="mic"></Image>
          <TextBox>
            <HighlightText>바디토리</HighlightText>
            <NormalText>는 이용자님의 건강관리를 위한 인공지능 헬스케어 서비스입니다</NormalText>
          </TextBox>
        </ServiceIntro>
        <RecordIntro>
          <TextContainer>
            <TextBox>
              <HighlightText>오늘 기록하기</HighlightText>
            </TextBox>
            <TextBox>
              <NormalText>
                음성인식 기술을 활용하여
                <br /> 누구나 쉽게 오늘의 건강상태를 기록해요
              </NormalText>
            </TextBox>
          </TextContainer>
          <Image src={mic} width={500} height={500} alt="mic"></Image>
        </RecordIntro>
      </FirstSection>
      <SecondSection>
        <RecordConfirmIntro>
          <ImageLeftBox className="gs_reveal gs_reveal_fromLeft delay600">
            <Image src={recordConfirm} alt="mic"></Image>
          </ImageLeftBox>
          <TextContainer className="gs_reveal gs_reveal_fromBottom">
            <TextBox>
              <HighlightText>기록 확인하기</HighlightText>
            </TextBox>
            <TextBox>
              <NormalText>최근 나의 건강상태 통계를 한눈에 볼 수 있어요</NormalText>
            </TextBox>
          </TextContainer>
        </RecordConfirmIntro>
        <RecordChartIntro>
          <TextBox className="gs_reveal gs_reveal_fromBottom">
            <NormalText>
              기록된 증상들은 깔끔하게 정리하고 분류해서
              <br /> 한눈에 보기 쉬운 증상차트를 제공해요
            </NormalText>
          </TextBox>
          <ImageRightBox className="gs_reveal gs_reveal_fromRight delay600">
            <Image src={recordList} alt="mic"></Image>
          </ImageRightBox>
        </RecordChartIntro>
        <RecordRecomendIntro>
          <CenterTextBox className="gs_reveal gs_reveal_fromBottom">
            <NormalText>
              A.I 토리가 기록된 증상을 분석하여
              <br />
              나에게 적합한 진료과목과 내 근처 병원을 추천해줘요!
            </NormalText>
          </CenterTextBox>
          <div className="gs_reveal gs_reveal_fromBottom delay800">
            <Image src={recordRecomend} alt="mic"></Image>
          </div>
        </RecordRecomendIntro>
      </SecondSection>
      <ThirdSection>
        <ManageHospitalIntro>
          <TextContainer className="gs_reveal gs_reveal_fromBottom">
            <TextBox>
              <HighlightText>내 병원 관리하기</HighlightText>
            </TextBox>
            <TextBox>
              <NormalText>
                바디토리와 연계된 병원에 나의 증상 기록을 공유하면
                <br /> 보다 정확하고 간편하게 진료를 받을 수 있어요!
              </NormalText>
            </TextBox>
          </TextContainer>
          <div className="gs_reveal gs_reveal_fromRight delay600">
            <Image src={map} alt="mic"></Image>
          </div>
        </ManageHospitalIntro>
        <ManageShareIntro>
          <ImageLeftBox className="gs_reveal gs_reveal_fromLeft delay600">
            <Image src={share} alt="mic"></Image>
          </ImageLeftBox>
          <TextBox className="gs_reveal gs_reveal_fromBottom">
            <NormalText>
              언제든지 증상기록 공유를 해제하거나 시작할 수 있고
              <br /> 새로운 병원을 등록할 수도 있어요
            </NormalText>
          </TextBox>
        </ManageShareIntro>
        <MedicalRecordIntro>
          <TextBox className="gs_reveal gs_reveal_fromBottom">
            <NormalText>
              바디토리에 등록된 병원에서 진료를 받았다면
              <br /> 진료 기록을 한눈에 확인할 수 있어요
            </NormalText>
          </TextBox>
          <ImageRightBox className="gs_reveal gs_reveal_fromRight delay600">
            <Image src={medicalRecord} alt="mic"></Image>
          </ImageRightBox>
        </MedicalRecordIntro>
        <StartTory>
          <TextBox className="gs_reveal gs_reveal_fromBottom">
            <LargeText>바디토리를 시작해볼까요?</LargeText>
          </TextBox>
          <RoundedDefaultButton
            lg
            bgColor="rgb(17,212,202)"
            className="gs_reveal gs_reveal_fromBottom delay400"
            onClick={() => router.push("/")}
          >
            네, 좋아요!
          </RoundedDefaultButton>
        </StartTory>
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
  padding: 200px;
  & > div {
    margin-bottom: 200px;
  }
`;
const ServiceIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const RecordIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SecondSection = styled.section`
  background-color: #e7e8ff;
  padding: 200px;
  & > div {
    margin-bottom: 200px;
  }
`;
const RecordConfirmIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordChartIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RecordRecomendIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const ThirdSection = styled.section`
  background-color: #f2f3ff;
  padding: 200px;
  & > div {
    margin-bottom: 200px;
  }
`;
const ManageHospitalIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ManageShareIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MedicalRecordIntro = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StartTory = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ImageLeftBox = styled.div`
  position: relative;
  left: -200px;
`;
const ImageRightBox = styled.div`
  position: relative;
  right: -200px;
`;

const TextBox = styled.div``;

const TextContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CenterTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const NormalText = styled.span`
  font-size: 30px;
`;
const HighlightText = styled.span`
  font-size: 42px;
  color: #5359e9;
  font-weight: 500;
`;
const LargeText = styled.span`
  font-size: 50px;
`;

const StartButton = styled(RectangleDefaultButton)`
  width: 400px;
  height: 80px;
  color: white;
  border-radius: 20px;
  background-color: #11d4ca;
`;

export default Tory;
