import EventMarkerContainer from "@components/Maker";
import MapDetailModal from "@components/modals/map/MapDetailModal";
import { Box } from "@styles/Common";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

interface ArroundMapProps {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  department?: string;
}
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
const ArroundMap = ({ width, height, latitude, longitude, department }: ArroundMapProps) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [clickIndex, setClickIndex] = useState(-1);
  const [hospitals, setHospitals] = useState<AroundMapHospitalsResponse>();
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const { getApi } = customApi(`/api/users/my-hospitals/map?latitude=${latitude}&longitude=${longitude}`);

  const { isLoading } = useQuery<AroundMapHospitalsResponse>(["hospitalsMap", "map"], getApi, {
    onSuccess(data) {
      setHospitals(data);
    },
  });
  useEffect(() => {}, [department]);
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
  return isLoading ? (
    <Map
      center={{
        lat: coords.latitude,
        lng: coords.longitude,
      }}
      isPanto={true}
      style={{
        width,
        height,
      }}
      level={3}
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
  ) : null;
};
export default ArroundMap;
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
