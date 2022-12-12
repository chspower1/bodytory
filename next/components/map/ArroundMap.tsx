import { CircleButton } from "@components/layout/buttons/Button";
import EventMarkerContainer from "@components/map/Maker";
import MapDetailModal from "@components/modals/map/MapDetailModal";
import { Box, Container, ToryText } from "@styles/Common";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import MagnifierIcon from "@src/assets/icons/magnifier.svg";
import UserIcon from "@src/assets/icons/user.svg";
import { AxiosError } from "axios";

interface Coords {
  latitude: number | null;
  longitude: number | null;
}
type ArroundMapProps = Coords & {
  width: string;
  height: string;
  department?: string;
};
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
interface SearchHospitalRequest {
  minLatitude: number;
  minLongitude: number;
  maxLatitude: number;
  maxLongitude: number;
}
type AroundMapHospitalsResponse = AroundMapHospital[];

const ArroundMap = ({ width, height, latitude, longitude, department }: ArroundMapProps) => {
  const [clickIndex, setClickIndex] = useState(-1);
  const [allHospitals, setAllHospitals] = useState<AroundMapHospitalsResponse>();
  const [filteredHospitals, setFilteredHospitals] = useState<AroundMapHospitalsResponse>();
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const mapRef = useRef<kakao.maps.Map | undefined>();
  const { getApi, postApi } = customApi(`/api/users/my-hospitals/map?latitude=${latitude}&longitude=${longitude}`);
  const { data: initialHospitals } = useQuery<AroundMapHospitalsResponse>(["hospitalsMap", "map"], getApi, {
    enabled: Boolean(latitude && longitude),
    onSuccess(data) {
      setAllHospitals(data);
    },
  });
  const { mutate } = useMutation<AroundMapHospitalsResponse, AxiosError, SearchHospitalRequest>(
    ["hospital", "map"],
    postApi,
    {
      onSuccess(data) {
        setAllHospitals(data);
      },
    },
  );
  const filterHospitals = useCallback(
    (data: AroundMapHospitalsResponse | undefined) => {
      return data?.filter(
        hospital =>
          hospital.medicalDepartments.filter(
            medicalDepartment => medicalDepartment.medicalDepartment.department === department,
          ).length > 0,
      );
    },
    [department],
  );

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

  const handleClickReset = () => {
    if (latitude && longitude) {
      const coords = new kakao.maps.LatLng(latitude, longitude);
      setAllHospitals(initialHospitals);
      mapRef.current?.setCenter(coords);
      mapRef.current?.setLevel(3);
    }
  };

  useEffect(() => {
    if (!allHospitals) setAllHospitals(initialHospitals);
    if (department === "all") setFilteredHospitals(allHospitals);
    else setFilteredHospitals(filterHospitals(allHospitals));
  }, [department, filterHospitals, allHospitals, initialHospitals]);

  return (
    <MapContainer width={width} height={height}>
      {latitude && longitude && coords ? (
        <>
          <ControlBox>
            <CircleButton
              nonSubmit
              size="custom"
              height="50px"
              width="50px"
              onClick={() => {
                mutate({
                  minLatitude: mapRef.current?.getBounds().getSouthWest().getLat()!,
                  minLongitude: mapRef.current?.getBounds().getSouthWest().getLng()!,
                  maxLatitude: mapRef.current?.getBounds().getNorthEast().getLat()!,
                  maxLongitude: mapRef.current?.getBounds().getNorthEast().getLng()!,
                });
              }}
            >
              <MagnifierIcon width={25} height={25} fill="white" />
            </CircleButton>
            <CircleButton nonSubmit size="custom" height="50px" width="50px" onClick={handleClickReset}>
              <UserIcon width={30} height={30} fill="white" />
            </CircleButton>
          </ControlBox>
          <Map
            center={{
              lat: coords.latitude!,
              lng: coords.longitude!,
            }}
            isPanto={true}
            style={{
              width,
              height,
            }}
            onCreate={map => (mapRef.current = map)}
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
            {filteredHospitals?.map((hospital, index) => (
              <MarkerBox key={index}>
                <EventMarkerContainer hospital={hospital} index={index} handleClickMarker={handleClickMarker} />
                <MapDetailModal
                  clickIndex={clickIndex}
                  setClickIndex={setClickIndex}
                  index={index}
                  hospital={hospital}
                />
              </MarkerBox>
            ))}
          </Map>
        </>
      ) : (
        <NotAccessMessage>위치정보 없음</NotAccessMessage>
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
  position: relative;
`;
const ControlBox = styled(Box)`
  position: absolute;
  right: 0px;
  top: 30px;
  right: 30px;
  gap: 20px;
  z-index: 999;
`;

const MarkerBox = styled(Box)`
  position: absolute;
`;

const NotAccessMessage = styled(ToryText)``;
