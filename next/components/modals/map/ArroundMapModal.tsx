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
import ArroundMap from "@components/map/ArroundMap";

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
interface ArroundMapMaodalProps {
  onClose: () => void;
  latitude: number;
  longitude: number;
}
const ArroundMapModal: NextPage<ArroundMapMaodalProps> = ({ onClose, latitude, longitude }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [clickIndex, setClickIndex] = useState(-1);
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const { getApi } = customApi(`/api/users/my-hospitals/map?latitude=${latitude}&longitude=${longitude}`);
  const { data: hospitals } = useQuery<AroundMapHospitalsResponse>(["hospitalsMap", "map"], getApi, {
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
      <ModalContainer flex width="1500px" height="800px">
        <ToryText>현재 소희님의 위치를 기준으로 주변 정형외과들을 찾았어요!</ToryText>
        <ArroundMap width="1500px" height="600px" longitude={longitude} latitude={latitude} department={department} />

        <ButtonBox>
          <RoundButton fontSize="16px" width="220px" height="40px" onClick={onClose}>
            닫기
          </RoundButton>
        </ButtonBox>
      </ModalContainer>
    </ModalWrapper>
  ) : null;

  return latitude && longitude
    ? ReactDOM.createPortal(modalContent, document.getElementById("modal-root") as HTMLElement)
    : null;
};
export default ArroundMapModal;

const HoverBox = styled.div`
  border: 3px ${props => props.theme.color.weekPurple} solid;
  border-radius: 5px;
  background-color: white;
  padding: 5px 10px;
  transform: translateY(-60%);
`;
const ButtonBox = styled.div`
  button {
    margin: 0 auto;
  }
`;

const MarkerBox = styled(Box)`
  position: absolute;
`;
