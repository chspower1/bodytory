import EventMarkerContainer from "@components/Maker";
import MapDetailModal from "@components/modals/map/MapDetailModal";
import { Box, Container } from "@styles/Common";
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
  const [clickIndex, setClickIndex] = useState(-1);
  const [hospitals, setHospitals] = useState<AroundMapHospitalsResponse>();
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const { getApi } = customApi(`/api/users/my-hospitals/map?latitude=${latitude}&longitude=${longitude}`);
  const { isLoading, data } = useQuery<AroundMapHospitalsResponse>(["hospitalsMap", "map"], getApi);
  useEffect(() => {
    if (department === "all") setHospitals(data);
    else setHospitals(filterHospitals(data));
  }, [department, data]);

  const filterHospitals = (data: AroundMapHospitalsResponse | undefined) => {
    return data?.filter(
      hospital =>
        hospital.medicalDepartments.filter(
          medicalDepartment => medicalDepartment.medicalDepartment.department === department,
        ).length > 0,
    );
  };

  const handleClickMarker = ({
    index,
    longitude,
    latitude,
  }: {
    index: number;
    longitude: number;
    latitude: number;
  }) => {
    setClickIndex(index);
    setCoords({ latitude: latitude + 0.001, longitude: longitude });
  };

  console.log(department);

  return (
    <MapContainer width={width} height={height}>
      {!isLoading && (
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
      )}
    </MapContainer>
  );
};
export default ArroundMap;
const MapContainer = styled(Container)<{ width: string; height: string }>`
  width: ${props => (props.width ? props.width : "100%")};
  height: ${props => (props.height ? props.height : "100%")};
  background-color: ${props => props.theme.color.weekPurple};
  border-radius: 20px;
  overflow: hidden;
`;
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
