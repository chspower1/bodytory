import { RoundButton } from "@components/button/Button";
import { Dim } from "@components/Modal/Modal";
import { BodyText, Box, BtnBox, Col, FlexContainer, Row, ToryText, WhiteBoldText, WhiteText } from "@styles/Common";
import Image from "next/image";
import { CustomOverlayMap, Map, MapInfoWindow, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import kakaomap from "/public/static/icon/kakao_map.svg";
import pointer from "/public/static/icon/pointer.svg";
import phone from "/public/static/icon/phone.svg";
import cross from "/public/static/icon/cross.svg";
import triangle from "/public/static/icon/triangle.png";
import marker from "/public/static/icon/map_marker.png";
import customApi from "@utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HospitalsForMap } from "@api/users/my-hospitals/map";
import { AxiosError } from "axios";

interface Coords {
  lat: number;
  lng: number;
}
interface AroundHospitalsResponse {
  hospitals: HospitalsForMap[];
}
const Test = () => {
  const [targetIndex, setTargetIndex] = useState(-1);
  const { postApi, getApi } = customApi("/api/users/my-hospitals/map");
  const { mutate, data } = useMutation<AroundHospitalsResponse, AxiosError, { x: number; y: number }>(
    ["hospitals", "map"],
    postApi,
    {
      onSuccess(data) {
        console.log(data);
      },
    },
  );
  const handleClickAddHospital = () => {};
  const [coords, setCoords] = useState<Coords>({
    lat: 0,
    lng: 0,
  });
  // console.log(geolocation.getCurrentPosition);
  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(position => {
      console.log("x", position.coords.longitude);
      console.log("y", position.coords.latitude);
      setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
      mutate({ x: position.coords.longitude, y: position.coords.latitude });
    });
  }, []);
  return data ? (
    <Dim>
      <MapContainer>
        <ToryText>현재 소희님의 위치를 기준으로 주변 정형외과들을 찾았어요!</ToryText>
        <Map
          center={{
            lat: coords.lat,
            lng: coords.lng,
          }}
          style={{
            width: "100%",
            height: "560px",
          }}
          level={3}
        >
          {data.hospitals?.map((hospital, index) => (
            <div key={index}>
              <MapMarker
                position={{ lat: hospital.y!, lng: hospital.x! }}
                image={{
                  src: "https://imagedelivery.net/AbuMCvvnFZBtmCKKJV_e6Q/ba695e48-c89f-4e8d-febb-10018a877600/avatar", // 마커이미지의 주소입니다
                  size: {
                    width: 45,
                    height: 45,
                  },
                  options: {
                    offset: {
                      x: 0,
                      y: 0,
                    },
                  },
                }}
                onMouseOver={() => setTargetIndex(index)}
                onMouseOut={() => setTargetIndex(-1)}
              />
              {targetIndex === index && (
                <CustomOverlayMap position={{ lat: hospital.y!, lng: hospital.x! }}>
                  <HoverBox>{hospital.name}</HoverBox>
                </CustomOverlayMap>
              )}
            </div>
          ))}

          <CustomOverlayMap
            position={{
              lat: 33.450701,
              lng: 126.570667,
            }}
          >
            <InfoWindowBox>
              <TopArea>
                <Image src={kakaomap} alt="사진" />
                <Name fontSize="20px">삼성본정형외과의원</Name>
              </TopArea>
              <ContentBox>
                <AdressBox>
                  <Image src={pointer} alt="사진" />
                  <BodyText>서울 성북구 아리랑로 7 농혁 건물,2층</BodyText>
                  <Image src={kakaomap} alt="kakao" />
                </AdressBox>
                <PhoneBox>
                  <Image src={phone} alt="사진" />
                  <BodyText>02-951-5863</BodyText>
                </PhoneBox>
                <DepartmentBox>
                  <Image src={cross} alt="사진" />
                  <BodyText>정형외과, 이비인후과</BodyText>
                </DepartmentBox>
              </ContentBox>
              <RoundButton width="88px" height="40px" bgColor="rgb(18, 212, 201)" fontSize="16px" boxShadow={false}>
                추가
              </RoundButton>
              <Tail src={triangle} alt="사진" />
            </InfoWindowBox>
          </CustomOverlayMap>
        </Map>

        <BtnBox width="460px">
          <RoundButton fontSize="16px" width="220px" height="40px">
            확인했어요!
          </RoundButton>
          <RoundButton
            fontSize="16px"
            width="220px"
            height="40px"
            bgColor="rgb(198, 205, 250)"
            textColor="rgb(93, 107, 178)"
          >
            다른 병원들도 찾아볼래요
          </RoundButton>
        </BtnBox>
      </MapContainer>
    </Dim>
  ) : null;
};
export default Test;
const InfoWindowBox = styled(Col)`
  background-color: white;
  border: none;
  border-radius: 20px;
  width: 420px;
  height: 274px;
  justify-content: space-between;
  position: relative;
  box-shadow: ${props => props.theme.boxShadow.normal};
  padding-bottom: 10px;
`;
const HoverBox = styled(Box)`
  border: 2px ${props => props.theme.color.darkBg} solid;
  border-radius: 5px;
  background-color: white;
`;
const TopArea = styled(Row)`
  border-radius: 20px 20px 0px 0px;
  background-color: #363cbf;
  width: 100%;
  height: 70px;
  justify-content: flex-start;
  padding-left: 30px;
`;
const Name = styled(WhiteBoldText)`
  margin-left: 20px;
`;
const ContentBox = styled(Col)`
  width: 100%;
  height: 120px;
  justify-content: space-between;
`;
const AdressBox = styled(Box)`
  margin-left: 30px;
  gap: 10px;
  justify-content: flex-start;
  width: 100%;
`;
const PhoneBox = styled(AdressBox)``;
const DepartmentBox = styled(AdressBox)``;
const MapContainer = styled(FlexContainer)`
  background-color: white;
  width: 1450px;
  height: 760px;
  flex-direction: column;
  border-radius: 30px;
  justify-content: space-evenly;
`;
const Tail = styled(Image)`
  position: absolute;
  bottom: -37px;
`;
