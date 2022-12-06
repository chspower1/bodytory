import { CircleButton, RoundButton } from "@components/buttons/Button";
import { BodyText, Box, BtnBox, Col, FlexContainer, Row, ToryText, WhiteBoldText, WhiteText } from "@styles/Common";
import Image from "next/image";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

import customApi from "@utils/client/customApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import Link from "next/link";
import { theme } from "@styles/theme";
import { NextPage } from "next";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalContainer, ModalWrapper, Dim } from "@styles/ModalStyled";
import { HOSPITALS } from "constant/queryKeys";

// Icon
import kakaomap from "@public/static/icon/map/kakao_map.png";
import pin from "@public/static/icon/map/pin.png";
import web from "@public/static/icon/map/web.png";
import cross from "@public/static/icon/map/hospital.png";

import tory from "@public/static/icon/map/tory_circle.png";
import x from "@public/static/icon/x.png";
import useCoords from "@hooks/useCoords";
import Modal from "../Modal";
import EventMarkerContainer from "@components/Maker";
import useHospital from "@hooks/useHospital";
import sliceName from "@utils/client/sliceHospitalName";
import MapDetailModal from "./MapDetailModal";

interface Coords {
  latitude: number;
  longitude: number;
}
export interface AroundMapHospital {
  id: number;
  name: string;
  x: number;
  y: number;
  address: string;
  homepage: string | null;
  medicalDepartments: medicalDepartment[];
  my: boolean;
}
interface medicalDepartment {
  medicalDepartment: { department: string };
}
type AroundMapHospitalsResponse = AroundMapHospital[];
interface ArroundMapProps {
  onClose: () => void;
  latitude: number;
  longitude: number;
}
const ArroundMap: NextPage<ArroundMapProps> = ({ onClose, latitude, longitude }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [clickIndex, setClickIndex] = useState(-1);
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const { getApi } = customApi(`/api/users/my-hospitals/map?latitude=${latitude}&longitude=${longitude}`);
  const { data: hospitals } = useQuery<AroundMapHospitalsResponse>(["hospitals", "map"], getApi, {
    onSuccess(data) {
      console.log(data);
    },
  });

  const handleClickMarker = ({
    index,
    longitude,
    latitude,
  }: {
    index: number;
    longitude: number;
    latitude: number;
  }) => {
    setHoverIndex(-1);
    setClickIndex(index);
    setCoords({ latitude: latitude + 0.001, longitude: longitude });
  };

  const modalContent = hospitals ? (
    <ModalWrapper>
      <Dim onClick={onClose} />
      <ModalContainer width="1500px" height="800px">
        <ToryText>현재 소희님의 위치를 기준으로 주변 정형외과들을 찾았어요!</ToryText>
        <Map
          center={{
            lat: coords.latitude,
            lng: coords.longitude,
          }}
          isPanto={true}
          style={{
            width: "100%",
            height: "560px",
          }}
          level={3}
          // onClick={() => setClickIndex(-1)}
        >
          <MapMarker
            position={{ lat: latitude!, lng: longitude! }}
            image={{
              src: "https://imagedelivery.net/AbuMCvvnFZBtmCKKJV_e6Q/e545a9f3-61fc-49de-df91-a3f5b4e08200/avatar", // 마커이미지의 주소입니다
              size: {
                width: 45,
                height: 45,
              },
              options: {
                offset: {
                  x: 23,
                  y: 0,
                },
              },
            }}
          />
          {hospitals?.map((hospital, index) => (
            <MarkerBox key={index}>
              <EventMarkerContainer hospital={hospital} index={index} handleClickMarker={handleClickMarker} />
              <MapDetailModal clickIndex={clickIndex} setClickIndex={setClickIndex} index={index} hospital={hospital} />
            </MarkerBox>
          ))}
        </Map>

        <BtnBox width="460px">
          <RoundButton fontSize="16px" width="220px" height="40px" onClick={onClose}>
            확인했어요!
          </RoundButton>
          <RoundButton
            padding="0px 10px"
            size="custom"
            fontSize="16px"
            width="220px"
            height="40px"
            bgColor="rgb(198, 205, 250)"
            textColor="rgb(93, 107, 178)"
          >
            다른 병원들도 찾아볼래요
          </RoundButton>
        </BtnBox>
      </ModalContainer>
    </ModalWrapper>
  ) : null;

  return latitude && longitude
    ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement)
    : null;
};
export default ArroundMap;

const HoverBox = styled.div`
  border: 3px ${props => props.theme.color.weekPurple} solid;
  border-radius: 5px;
  background-color: white;
  padding: 5px 10px;
  transform: translateY(-60%);
`;

const MarkerBox = styled(Box)`
  position: absolute;
`;
