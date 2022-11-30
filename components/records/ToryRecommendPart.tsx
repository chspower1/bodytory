import { RoundButton } from "@components/button/Button";
import styled, { css } from "styled-components";
import IconHospital from "@public/icon_hospital.png"
import IconWarning from "@public/icon_warning.png"
import { useState } from "react";
import Modal from "@components/Modal/Modal";


function ToryRecommend() {

  const [showModal, setShowModal] = useState(false);

  const handleClickLogout = async () => {

  };

  return (
    <>
      <ToryRecommendContainer>
        <ToryRecommendBox>
          <RecommendText>
            <Tag>Ai 토리추천</Tag>
            <Text>
              {/* <strong>$손목 $통증</strong>이 많으시네요.  */}
              <strong>$정형외과</strong>에 한번 방문해보시는 건 어떠신가요?
            </Text>
          </RecommendText>
          <RoundButton size="md" onClick={() => setShowModal(true)}>내 주변 해당 병원 찾기</RoundButton>
        </ToryRecommendBox>
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

const ToryRecommendBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 8px 8px 18px 0px rgba(58, 64, 190, 0.3);
  background: ${({ theme }) => theme.color.input};
  color: ${({ theme }) => theme.color.white};
`;

const RecommendText = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  position: relative;
  background: url(${IconHospital.src}) no-repeat 8px 8px/20px;
  background-color: #F2F3FF;
  border-radius: 10px;
  padding: 10px 10px 10px 22px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkBg};
`;

const Text = styled.div`
  font-size: 20px;

  strong {
    font-weight: 700;
  }
`;

const MapContainer = styled.div`
`;

export default ToryRecommend