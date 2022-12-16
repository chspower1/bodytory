import styled from "styled-components";
import Image from "next/image";
import recordConfirm from "@src/assets/images/about/recordConfirm.png";
import recordList from "@src/assets/images/about/recordList.png";
import recordRecomend from "@src/assets/images/about/recordRecomend.png";
import map from "@src/assets/images/about/map.png";
import share from "@src/assets/images/about/share.png";
import medicalRecord from "@src/assets/images/about/medicalRecord.png";
import { RectangleDefaultButton, RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";
import { animateFrom, hide } from "@utils/client/animateFrom";
import { useRouter } from "next/router";
import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { motion } from "framer-motion";
import SpeakAnim from "@components/lotties/SpeakAnim";
import Mic from "@src/assets/icons/mic.svg";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext } from "next";

const Tory = () => {
  const router = useRouter();

  const [toriComment, setToriComment] = useState("서비스가 궁금하신가요?");
  const [toryMotionIdx, setToryMotionIdx] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem: any) {
      hide(elem); 

      ScrollTrigger.create({
        trigger: elem,
        onEnter: function() { animateFrom(elem) }, 
        onEnterBack: function() { animateFrom(elem, -1) },
        onLeave: function() { hide(elem) }
      });
    });


    const timer = setTimeout(() => {
      setToriComment("는 이용자님의 건강관리를 위한 인공지능 헬스케어 서비스입니다");
    }, 2400);
    return () => {
      clearTimeout(timer);
    };

  }, []);



  return (
    <>
      <FirstSection>
        <Container>
          <ServiceIntro>
            <TextBox>
              <ToryMotion
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1, ease: "easeOut" } }}
              >
                <ToryPurpleAnim segmentIndex={toryMotionIdx} />
              </ToryMotion>
              <ToriMessage
                key={toriComment}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.4 } }}
              >
                <strong>바디토리</strong>
                {toriComment}
              </ToriMessage>
            </TextBox>
          </ServiceIntro>
          <RecordIntro>
            <TextContainer className="gs_reveal gs_reveal_fromLeft">
              <TextBox>
                <HighlightText>오늘 기록하기</HighlightText>
                <NormalText>
                  음성인식 기술을 활용하여
                  <br /> 누구나 쉽게 오늘의 건강상태를 기록해요
                </NormalText>
              </TextBox>
            </TextContainer>
            <SpeakMotion className="gs_reveal">
              <MicIcon>
                <Mic/>
              </MicIcon>
              <SpeakAnim segmentIndex={0} play={true} />
            </SpeakMotion>
          </RecordIntro>
        </Container>
      </FirstSection>
      <SecondSection>
        <Container>
          <RecordConfirmIntro>
            <ImageLeftBox className="gs_reveal gs_reveal_fromLeft delay600">
              <img src={recordConfirm.src} width={900} alt="건강상태 통계 서비스" />
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
            <TextContainer className="gs_reveal gs_reveal_fromBottom">
              <TextBox>
                <NormalText>
                  기록된 증상들은 깔끔하게 정리하고 분류해서
                  <br /> 한눈에 보기 쉬운 증상차트를 제공해요
                </NormalText>
              </TextBox>
            </TextContainer>
            <ImageRightBox className="gs_reveal gs_reveal_fromRight">
              <img src={recordList.src} width={900} alt="증상차트 서비스" className="no-transform" />
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
            <div className="gs_reveal gs_reveal_fromBottom">
              <img src={recordRecomend.src} width={1200} alt="진료과목 추천 서비스" />
            </div>
          </RecordRecomendIntro>
        </Container>
      </SecondSection>
      <ThirdSection>
        <Container>
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
            <ImageRightBox className="gs_reveal gs_reveal_fromRight">
              <img src={map.src} width={900} alt="병원연계 서비스" className="no-transform" />
            </ImageRightBox>
          </ManageHospitalIntro>
          <ManageShareIntro>
            <ImageLeftBox className="gs_reveal gs_reveal_fromLeft">
              <img src={share.src} width={800} alt="병원관리 서비스" />
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
              <img src={medicalRecord.src} width={1000} alt="진료내역 조회 시스템" className="no-transform" />
            </ImageRightBox>
          </MedicalRecordIntro>
        </Container>
      </ThirdSection>
      <StartTory>
        <TextBox className="gs_reveal gs_reveal_fromBottom">
          <LargeText>바디토리를 시작해볼까요?</LargeText>
        </TextBox>
        <RoundedDefaultButton
          bgColor="rgb(17,212,202)"
          className="gs_reveal gs_reveal_fromBottom delay400"
          onClick={() => router.push("/")}
        >
          네, 좋아요!
        </RoundedDefaultButton>
        <StartToryMotion>
          <ToryPurpleAnim segmentIndex={4} />
        </StartToryMotion>
      </StartTory>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  padding: 0 200px;
`;

const TextContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;
`;

const TextBox = styled.div`
`;

const NormalText = styled.span`
  font-size: 30px;
  line-height: 1.8;
`;
const HighlightText = styled.div`
  font-size: 42px;
  color: #5359e9;
  font-weight: 700;
  margin-bottom: 50px;
`;
const LargeText = styled.span`
  font-size: 50px;
`;

const CenterTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ImageLeftBox = styled.div`
  position: relative;
  left: -120px;
  width: 50%;

  img {
    max-width: none;
    transform: translate(-200px, 0);

    &.no-transform {
      transform: translate(0, 0);
    }
  }
`;

const ImageRightBox = styled.div`
  position: relative;
  right: -120px;
  width: 50%;

  img {
    max-width: none;
    transform: translate(200px, 0);

    &.no-transform {
      transform: translate(0, 0);
    }
  }
`;


const FirstSection = styled.section`
  background-color: #f2f3ff;
`;
const ServiceIntro = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${TextBox} {
    position: relative;
    width: 70%;
    max-width: 1000px;
    padding-left: 300px;
    word-break: keep-all;
  }
`;
const RecordIntro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 200px;
`;
const SecondSection = styled.section`
  background-color: #e7e8ff;
`;
const RecordConfirmIntro = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 200px 0 100px;
`;
const RecordChartIntro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const RecordRecomendIntro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 200px 0;

  ${NormalText} {
    margin-bottom: 50px;
  }
`;
const ThirdSection = styled.section`
  background-color: #f2f3ff;
`;
const ManageHospitalIntro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 200px 0 100px;
`;
const ManageShareIntro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
`;
const MedicalRecordIntro = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0;
`;

const StartTory = styled.div`
  width: 100%;
  padding: 150px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${TextBox} {
    margin-bottom: 60px;
  }
`;

const StartToryMotion = styled.div`
  width: 400px;
  height: 400px;
`;


const ToriMessage = styled(motion.div)`
  font-size: 42px;

  strong {
    font-weight: 700;
    color: #5359e9;
  }
`;

const StartButton = styled(RectangleDefaultButton)`
  width: 400px;
  height: 80px;
  color: white;
  border-radius: 20px
  background-color: #11d4ca;
`;

const ToryMotion = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-25%, -60%);
  width: 400px;
  height: 400px;
`;

const SpeakMotion = styled(motion.div)`
  position: relative;
  width: 600px;
  height: 600px;
`;

const MicIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: ${({theme}) => theme.color.darkBg};
  border-radius: 50%;
  z-index: 5;

  svg {
    display: block;
    width: 60%;
    margin: 0 auto;
  }
`;


export default Tory;

export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
