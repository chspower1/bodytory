import useHospital from "@hooks/useHospital";
import { Box } from "@styles/Common";
import sliceName from "@utils/client/sliceHospitalName";
import { HOSPITALS } from "constant/queryKeys";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { CustomOverlayMap, CustomOverlayRoadview, MapMarker, MapInfoWindow } from "react-kakao-maps-sdk";
import styled from "styled-components";
import Modal from "./modals/Modal";

interface EventMarkerContainerProps {
  hospital: any;
  index: number;
  handleClickMarker: any;
}

const EventMarkerContainer = ({ hospital, index, handleClickMarker }: EventMarkerContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <MapMarker
        clickable={true}
        position={{ lat: hospital.y!, lng: hospital.x! }}
        image={{
          src: "https://imagedelivery.net/AbuMCvvnFZBtmCKKJV_e6Q/ba695e48-c89f-4e8d-febb-10018a877600/avatar", // 마커이미지의 주소입니다
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
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseOut={() => {
          setIsVisible(false);
        }}
        onClick={() => handleClickMarker({ index, longitude: hospital.x, latitude: hospital.y })}
      >
        {/* {isVisible && <HoverBox>{hospital.name}</HoverBox>} */}
      </MapMarker>
      {isVisible && (
        <CustomOverlayMap position={{ lat: hospital.y! + 0.00015, lng: hospital.x! }}>
          <HoverBox>{hospital.name}</HoverBox>
        </CustomOverlayMap>
      )}
    </>
  );
};

const HoverBox = styled(Box)`
  padding: 0px 20px;
  border: 3px ${props => props.theme.color.weekPurple} solid;
  border-radius: 5px;
  background-color: white;
`;

export default EventMarkerContainer;
