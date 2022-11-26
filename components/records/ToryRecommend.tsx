import { RoundButton } from "@components/button/Button";
import styled, { css } from "styled-components";
import IconHospital from "@public/icon_hospital.png"
import IconWarning from "@public/icon_warning.png"
import { useState } from "react";
import Modal from "@components/Modal";

interface ButtonProps {
  bgColor?: string;
}

function ToryRecommend() {

  const [showModal, setShowModal] = useState(false);

  const handleClickLogout = async () => {

  };

  return (
    <>
      <ToryRecommendContainer>
        <ToryRecommendBox bgColor="">
          <RecommendText>
            <Tag>Ai 토리추천</Tag>
            <Text>
              <span>$정형외과, 가정의학과, 치과</span>에 방문해보시는 것을 추천드려요!
            </Text>
          </RecommendText>
          <RoundButton size="md" onClick={() => setShowModal(true)}>내 주변 해당 병원 찾기</RoundButton>
        </ToryRecommendBox>
        <Warning>Ai 토리추천 서비스는 의료행위가 아닌 정보 참고용 서비스임을 밝히며, 정확한 의학적 판단을 위해서는 반드시 가까운 의료기관을 내원해주세요</Warning>
      </ToryRecommendContainer>
      
      <Modal onClose={() => setShowModal(false)} activeFuction={handleClickLogout} show={showModal} title={""}>
        <MapContainer>
          <h2>현재 <strong>$소희님</strong>의 위치를 기준으로 주변 <strong>$정형외과</strong>들을 찾았어요!</h2>
        </MapContainer>
      </Modal>
    </>
  )
}

const ToryRecommendContainer = styled.div`
  margin-bottom: 60px;
`;

const ToryRecommendBox = styled.div<{
  bgColor: string
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 8px 8px 18px 0px rgba(32, 36, 120, 0.3);
  background: ${({ theme }) => theme.color.white};
  

  ${props => props.bgColor === "purple" && 
    css`
      background: ${({ theme }) => theme.color.darkBg};
    `
  }
`;

const RecommendText = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  position: relative;
  background: url(${IconHospital.src}) no-repeat 8px 8px/20px;
  background-color: #EBECFC;
  border-radius: 10px;
  padding: 10px 10px 10px 22px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkBg};
`;

const Text = styled.div`
  font-size: 20px;

  span {
    font-weight: 700;
  }
`;

const Warning = styled.div`
  background: url(${IconWarning.src}) no-repeat 25px 50%/13px;
  padding: 15px 45px;
  font-size: 13px;
  color: #D9DEFF;
  opacity: .8;
`;

const MapContainer = styled.div`
`;

export default ToryRecommend