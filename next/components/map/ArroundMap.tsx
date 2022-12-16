import EventMarkerContainer from "@components/map/Maker";
import MapDetailModal from "@components/modals/map/MapDetailModal";
import { Box, Container, ToryText } from "@styles/Common";
import { useMutation, useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import MagnifierIcon from "@src/assets/icons/magnifier.svg";
import MarkerMe from "@src/assets/icons/marker_me.png";
import UserIcon from "@src/assets/icons/user.png";
import { AxiosError } from "axios";
import useDepartmentSelect from "@hooks/useDepartmentSelect";
import { media } from "@styles/theme";

interface Coords {
  latitude: number | null;
  longitude: number | null;
}
type ArroundMapProps = Coords & {
  departmentList?: string[];
  isAll?: boolean;
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

const ArroundMap = ({ latitude, longitude, departmentList, isAll }: ArroundMapProps) => {
  const { department, DepartmentSelect } = useDepartmentSelect(departmentList ? departmentList : [], isAll);

  const [clickIndex, setClickIndex] = useState(-1);
  const [allHospitals, setAllHospitals] = useState<AroundMapHospitalsResponse>();
  const [filteredHospitals, setFilteredHospitals] = useState<AroundMapHospitalsResponse>();
  const [coords, setCoords] = useState<Coords>({ latitude, longitude });
  const [centerChange, setCenterChange] = useState<boolean>(false);
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
            medicalDepartment => medicalDepartment.medicalDepartment?.department === department,
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

    setCenterChange(false);
  };

  useEffect(() => {
    if (!allHospitals) setAllHospitals(initialHospitals);
    if (department === "all") setFilteredHospitals(allHospitals);
    else setFilteredHospitals(filterHospitals(allHospitals));
  }, [department, filterHospitals, allHospitals, initialHospitals]);

  return (
    <MapContainer>
      {latitude && longitude && coords ? (
        <>
          <ControlBox>
            <DepartmentSelect />
          </ControlBox>
          <MoveToMeBtn onClick={handleClickReset}>
            <i />
          </MoveToMeBtn>
          {centerChange && (
            <SearchHereBtn
              onClick={() => {
                mutate({
                  minLatitude: mapRef.current?.getBounds().getSouthWest().getLat()!,
                  minLongitude: mapRef.current?.getBounds().getSouthWest().getLng()!,
                  maxLatitude: mapRef.current?.getBounds().getNorthEast().getLat()!,
                  maxLongitude: mapRef.current?.getBounds().getNorthEast().getLng()!,
                });
                setCenterChange(false);
                setClickIndex(-1);
              }}
            >
              <MagnifierIcon width={20} height={20} fill="white" /> 현 지도에서 검색
            </SearchHereBtn>
          )}
          <Maps
            center={{
              lat: coords.latitude!,
              lng: coords.longitude!,
            }}
            isPanto={true}
            onCreate={(map: kakao.maps.Map | undefined) => (mapRef.current = map)}
            level={3}
            onCenterChanged={() => !centerChange && setCenterChange(true)}
          >
            <MapMarker
              position={{ lat: latitude!, lng: longitude! }}
              image={{
                src: MarkerMe.src, // 마커이미지의 주소입니다
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
          </Maps>
        </>
      ) : (
        <NotAccessMessage>
          위치를 파악할 수 없어요!
          <br />
          위치 엑세스를 허용해주세요
        </NotAccessMessage>
      )}
    </MapContainer>
  );
};
export default ArroundMap;

const MapContainer = styled(Container)`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.weekPurple};
  overflow: hidden;
  position: relative;
  padding: 0;
  ${media.mobile} {
    border-radius: 0;
  }
`;

const Maps = styled(Map)`
  max-width: 1500px;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color.weekPurple};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  padding: 0;
  ${media.mobile} {
    border-radius: 0;
  }
`;

const ControlBox = styled(Box)`
  position: absolute;
  right: 0px;
  top: 20px;
  right: 20px;
  z-index: 5;
  background: rgba(255, 255, 255, 0.5);
  padding: 0;
  border-radius: 30px;
  box-shadow: 8px 8px 24px rgb(49 54 167 / 20%);
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const MarkerBox = styled(Box)`
  position: absolute;
`;

const MoveToMeBtn = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.error} url(${UserIcon.src}) no-repeat 50% 50%/ 60%;
  z-index: 5;
  box-shadow: 8px 8px 24px rgb(49 54 167 / 40%);

  &:after {
    content: "내 접속위치";
    position: absolute;
    top: 50%;
    left: 0px;
    width: 80px;
    transform: translate(-100%, -50%);
    font-size: 14px;
    font-weight: 500;
    background: rgba(74, 82, 92, 0.9);
    color: ${({ theme }) => theme.color.white};
    padding: 10px;
    border-radius: 30px;
    opacity: 0;
    pointer-events: none;
    transition: left 0.4s, opacity 0.4s;
  }

  &:hover {
    &:after {
      opacity: 1;
      left: -5px;
    }
  }
  ${media.mobile} {
    width: 40px;
    height: 40px;
  }
`;

const SearchHereBtn = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #6268fb;
  font-size: 16px;
  color: ${({ theme }) => theme.color.white};
  display: flex;
  align-items: center;
  padding: 14px 20px;
  border-radius: 50px;
  z-index: 5;
  box-shadow: 8px 8px 24px rgb(49 54 167 / 40%);
  transition: background 0.3s;

  svg {
    margin-right: 14px;
  }

  &:hover {
    background: #4b50d3;
  }
  ${media.mobile} {
    img,
    svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
    font-size: 12px;
    padding: 12px 24px;
  }
`;

export const NotAccessMessage = styled(ToryText)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
