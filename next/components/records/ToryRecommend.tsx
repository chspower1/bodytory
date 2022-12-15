import styled, { css } from "styled-components";
import IconHospital from "@src/assets/icons/icon_hospital.png";
import IconWarning from "@src/assets/icons/icon_warning.png";
import { useState } from "react";
import ArroundMapModal from "@components/modals/map/ArroundMapModal";
import LocationPinIcon from "@src/assets/icons/location_pin.svg";
import useCoords from "@hooks/useCoords";
import { AnimatePresence } from "framer-motion";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { media } from "@styles/theme";

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
            <MapButton img onClick={() => setShowModal(true)}>
              <LocationPinIcon />
              <span>내 주변 병원 찾기</span>
            </MapButton>
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

  ${media.custom(1280)} {
    margin-bottom: 40px;
  }
`;

const ToryRecommendBox = styled.div<{ inChart: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 8px 20px;
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

  ${media.custom(1440)} {
    padding: 4px 16px;
  }

  ${media.tablet} {
    padding: 10px 20px;
  }

  ${media.mobile} {
    flex-wrap: wrap;
    justify-content: center;
    padding: 8px 16px;
  }
`;

const RecommendText = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  word-break: keep-all;

  ${media.mobile} {
    width: 100%;
    padding: 4px 8px 16px;
  }
`;

const Tag = styled.span`
  position: relative;
  width: 7em;
  background: url(${IconHospital.src}) no-repeat 8px 8px/20px;
  background-color: #f2f3ff;
  border-radius: 10px;
  padding: 10px 10px 10px 22px;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkBg};

  ${media.custom(1440)} {
    font-size: 14px;
  }

  ${media.tablet} {
    display: none;
  }
`;

const Text = styled.div`
  font-size: 20px;
  width: calc(100% - 6.4em);

  strong {
    font-weight: 700;
  }

  ${media.custom(1440)} {
    font-size: 18px;
  }

  ${media.tablet} {
    font-size: 16px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
  }

  ${media.mobile} {
    font-size: 14px;
  }
`;

const Warning = styled.div`
  background: url(${IconWarning.src}) no-repeat 25px 18px/13px;
  padding: 15px 45px;
  font-size: 13px;
  color: #d9deff;
  opacity: 0.8;

  ${media.custom(1440)} {
    font-size: 12px;
    padding: 15px 5px 15px 32px;
    background-position: 15px 18px;
    background-size: 11px;
  }

  ${media.mobile} {
    font-size: 11px;
    padding: 15px 0px 10px 22px;
    background-position: 5px 18px;
    background-size: 11px;
  }
`;

const MapButton = styled(RoundedDefaultButton)`
  svg {
    margin-right: 10px;
  }

  ${media.custom(1440)} {
    font-size: 16px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  ${media.tablet} {
    font-size: 14px;
    padding: 10px 20px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  ${media.mobile} {
    font-size: 13px;
    padding: 8px 16px;
  }
`;

export default ToryRecommend;
