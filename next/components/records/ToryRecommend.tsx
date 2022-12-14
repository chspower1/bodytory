import styled, { css } from "styled-components";
import IconHospital from "@src/assets/icons/icon_hospital.png";
import IconWarning from "@src/assets/icons/icon_warning.png";
import { useState } from "react";
import ArroundMapModal from "@components/modals/map/ArroundMapModal";
import LocationPinIcon from "@src/assets/icons/location_pin.svg";
import useCoords from "@hooks/useCoords";
import { AnimatePresence } from "framer-motion";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";

interface ToryRecommendProps {
  mostThreeDepartment?: string[];
  inChart: boolean;
}

function ToryRecommend({ mostThreeDepartment, inChart }: ToryRecommendProps) {
  const [showModal, setShowModal] = useState(false);
  const { latitude, longitude } = useCoords();

  return (
    <>
      <ToryRecommendContainer>
        <ToryRecommendBox inChart={inChart}>
          <RecommendText>
            <Tag>Ai 토리추천</Tag>
            <Text>
              {mostThreeDepartment ? (
                <>
                  <strong>{mostThreeDepartment && mostThreeDepartment.join(", ")}</strong>에 방문해보시는 것을
                  추천드려요
                </>
              ) : (
                <p>아직 추천하는 진료과목이 없어요</p>
              )}
            </Text>
          </RecommendText>
          {mostThreeDepartment && mostThreeDepartment.length > 0 && (
            <RoundedDefaultButton img onClick={() => setShowModal(true)}>
              <LocationPinIcon width={26} height={26} style={{ marginRight: "10px" }} />
              <span>내 주변 해당 병원 찾기</span>
            </RoundedDefaultButton>
          )}
        </ToryRecommendBox>
        <Warning>
          Ai 토리추천 서비스는 의료행위가 아닌 정보 참고용 서비스임을 밝히며, 정확한 의학적 판단을 위해서는 반드시
          가까운 의료기관을 내원해주세요
        </Warning>
      </ToryRecommendContainer>
      <ArroundMapModal
        show={showModal}
        latitude={latitude}
        longitude={longitude}
        onClose={() => setShowModal(false)}
        mostThreeDepartment={mostThreeDepartment}
      />
    </>
  );
}

const ToryRecommendContainer = styled.div`
  margin-bottom: 60px;
`;

const ToryRecommendBox = styled.div<{ inChart: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 8px 8px 18px 0px rgba(32, 36, 120, 0.3);

  ${({ inChart }) =>
    inChart
      ? css`
          background: ${({ theme }) => theme.color.input};
          color: ${({ theme }) => theme.color.white};
        `
      : css`
          background: ${({ theme }) => theme.color.white};
        `}
`;

const RecommendText = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.span`
  position: relative;
  background: url(${IconHospital.src}) no-repeat 8px 8px/20px;
  background-color: #f2f3ff;
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

const Warning = styled.div`
  background: url(${IconWarning.src}) no-repeat 25px 50%/13px;
  padding: 15px 45px;
  font-size: 13px;
  color: #d9deff;
  opacity: 0.8;
`;

export default ToryRecommend;
