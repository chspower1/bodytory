import { RoundButton } from "@components/buttons/Button";
import styled, { css } from "styled-components";
import IconHospital from "@public/static/icon/icon_hospital.png";
import { useEffect, useState } from "react";
import Modal from "@components/modals/Modal";
import ArroundMapModal from "@components/modals/map/ArroundMapModal";
import { AnimatePresence } from "framer-motion";
import useCoords from "@hooks/useCoords";
import LocationPinIcon from "@public/static/icon/location_pin.svg";
import customApi from "@utils/client/customApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CHART_RECOMMEND_READ } from "constant/queryKeys";
import { useRouter } from "next/router";
import { Position } from "@prisma/client";

interface ToryRecommendProps {
  mostThreeDepartment?: string[];
  keywords: string[];
}

function ToryRecommendPart() {
  const [showModal, setShowModal] = useState(false);

  const { query } = useRouter();
  const position = query.position as Position;

  const { getApi } = customApi(`/api/users/records/chart/${position}`);
  const { data } = useQuery<ToryRecommendProps>([CHART_RECOMMEND_READ, position], getApi, {
    onSuccess(data) {
      console.log("차트", data);
    },
    onError(data) {
      console.log("에러", position);
    },
    enabled: !!position,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries([CHART_RECOMMEND_READ, position]);
  }, [position]);

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
          <RoundButton size="custom" height="50px" padding="0 30px" onClick={() => setShowModal(true)}>
            <LocationPinIcon width={26} height={26} style={{ marginRight: "10px" }} />
            <span>내 주변 해당 병원 찾기</span>
          </RoundButton>
        </ToryRecommendBox>
      </ToryRecommendContainer>
      {/* TODO : mostThreeDepartment 넣어주셈 */}
      {/* <ArroundMapModal show={showModal} onClose={() => setShowModal(false)} mostThreeDepartment={} /> */}
    </>
  );
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

export default ToryRecommendPart;
