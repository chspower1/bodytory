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
import triangle from "@public/static/icon/map/triangle.png";
import tory from "@public/static/icon/map/tory_circle.png";
import x from "@public/static/icon/x.png";
import useCoords from "@hooks/useCoords";
import Modal from "./Modal";
import EventMarkerContainer from "@components/Maker";
import useHospital from "@hooks/useHospital";
import sliceName from "@utils/client/sliceHospitalName";

interface Coords {
  latitude: number;
  longitude: number;
}
interface Hospital {
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
interface AroundHospitalsResponse {
  hospitals: Hospital[];
}
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
  const { data } = useQuery<AroundHospitalsResponse>(["hospitals", "map"], getApi, {
    onSuccess(data) {
      console.log(data);
    },
  });
  const { handleClickAddHospital, handleClickDeleteHospital, showModal, setShowModal } = useHospital();

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
  const handleMouseOutMarker = () => {
    setHoverIndex(-1);
  };

  const modalContent = data ? (
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
          {data?.hospitals?.map((hospital, index) => (
            <MarkerBox key={index}>
              <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                activeFuction={
                  hospital.my
                    ? () => {
                        handleClickDeleteHospital(hospital.id);
                      }
                    : () => {
                        handleClickAddHospital(hospital.id);
                      }
                }
                agreeType={!hospital.my}
                title="개인정보 수집 동의"
              >
                {hospital.my ? (
                  <p>
                    <b>{sliceName(hospital.name)}</b>를 등록된 병원에서 제거하시겠습니까?
                  </p>
                ) : (
                  <>
                    <p>병원을 추가하면 병원에서 나의 기록을 열람할 수 있습니다</p>
                    <p>
                      <b>{sliceName(hospital.name)}</b>에서 개인정보 수집 및 이용에 동의하십니까?
                    </p>
                  </>
                )}
              </Modal>
              <EventMarkerContainer hospital={hospital} index={index} handleClickMarker={handleClickMarker} />
              {/* {hoverIndex === index && (
                <CustomOverlayMap position={{ lat: hospital.y!, lng: hospital.x! }}>
                  <HoverBox>{hospital.name}</HoverBox>
                </CustomOverlayMap>
              )} */}
              {clickIndex === index && (
                <CustomOverlayMap
                  position={{
                    lat: hospital.y!,
                    lng: hospital.x!,
                  }}
                  yAnchor={1.1}
                >
                  <InfoWindowBox>
                    <TopArea>
                      <Image src={tory} alt="사진" />
                      <Name fontSize="20px">{hospital.name}</Name>
                      <Box style={{ position: "absolute", right: "20px" }}>
                        <CircleButton
                          width="30px"
                          height="30px"
                          bgColor={theme.color.error}
                          onClick={() => setClickIndex(-1)}
                        >
                          <Image src={x} alt="x" />
                        </CircleButton>
                      </Box>
                    </TopArea>
                    <ContentBox>
                      <AdressBox>
                        <Image src={pin} alt="사진" />
                        <AddressText title={hospital.address}>{hospital.address}</AddressText>

                        <Link
                          href={`https://map.kakao.com/link/to/${hospital.name},${hospital.y},${hospital.x}`}
                          target="_blank"
                        >
                          <Box>
                            <Image src={kakaomap} alt="kakao" width={20} height={20} />
                          </Box>
                        </Link>
                      </AdressBox>

                      <DepartmentBox>
                        <Image src={cross} alt="사진" />
                        <BodyText title={`${hospital.medicalDepartments.map(i => i.medicalDepartment.department)}`}>
                          {/* {hospital.medicalDepartments?.map(({ medicalDepartment }, index) => (
                            <span key={index}>{medicalDepartment.department}</span>
                          ))} */}
                          {`${hospital.medicalDepartments[0].medicalDepartment.department} 외 ${hospital.medicalDepartments.length}개`}
                        </BodyText>
                      </DepartmentBox>
                      <HomepageBox>
                        <Image src={web} alt="사진" />
                        {hospital.homepage ? (
                          <Link href={hospital.homepage} target="_blank" title={hospital.homepage}>
                            {hospital.name} 홈페이지 바로가기
                          </Link>
                        ) : (
                          <BodyText>홈페이지가 없습니다.</BodyText>
                        )}
                        {/*  */}
                      </HomepageBox>
                    </ContentBox>
                    <RoundButton
                      width="88px"
                      height="40px"
                      bgColor={hospital.my ? theme.color.error : "rgb(18, 212, 201)"}
                      fontSize="16px"
                      boxShadow={false}
                      onClick={() => handleClickAddHospital(hospital.id)}
                    >
                      {hospital.my ? "삭제" : "추가"}
                    </RoundButton>
                    <Tail src={triangle} alt="사진" />
                  </InfoWindowBox>
                </CustomOverlayMap>
              )}
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
const InfoWindowBox = styled(Col)`
  background-color: white;
  border: none;
  border-radius: 20px;
  width: 650px;
  height: 274px;
  justify-content: space-between;
  position: relative;
  box-shadow: ${props => props.theme.boxShadow.normal};
  padding-bottom: 10px;

  /* transform: translateY(-170px); */
`;
const HoverBox = styled.div`
  border: 3px ${props => props.theme.color.weekPurple} solid;
  border-radius: 5px;
  background-color: white;
  padding: 5px 10px;
  transform: translateY(-60%);
`;
const TopArea = styled(Row)`
  position: relative;
  border-radius: 20px 20px 0px 0px;
  background-color: #363cbf;
  width: 100%;
  height: 70px;
  justify-content: flex-start;
  padding-left: 30px;
`;
const MarkerBox = styled(Box)`
  position: absolute;
`;
const Name = styled(WhiteBoldText)`
  margin-left: 20px;
`;
const ContentBox = styled(Col)`
  width: 100%;
  height: 120px;
  margin-top: 10px;
  justify-content: space-between;
`;
const AdressBox = styled(Box)`
  margin-left: 70px;
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
`;
const AddressText = styled(BodyText)`
  max-width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const HomepageBox = styled(AdressBox)`
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.color.darkBg};
  }
`;
const DepartmentBox = styled(AdressBox)``;
const MapContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  z-index: 2000;
  background-color: white;
  width: 1450px;
  height: 760px;
  flex-direction: column;
  border-radius: 30px;
  justify-content: space-evenly;
  margin: auto;
`;
const Tail = styled(Image)`
  position: absolute;
  bottom: -37px;
`;
