import { RoundButton } from "@components/button/Button";
import { Dim } from "@components/Modal";
import { BodyText, Box, BtnBox, Col, FlexContainer, Row, ToryText } from "@styles/Common";
import Image from "next/image";
import { CustomOverlayMap, Map, MapInfoWindow } from "react-kakao-maps-sdk";
import styled from "styled-components";
import kakaomap from "/public/static/icon/kakao_map.svg";
const Test = () => {
  return (
    <Dim>
      <MapContainer>
        <ToryText>현재 소희님의 위치를 기준으로 주변 정형외과들을 찾았어요!</ToryText>
        <Map
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "560px",
          }}
          level={3} // 지도의 확대 레벨
        >
          <CustomOverlayMap
            position={{
              lat: 33.450701,
              lng: 126.570667,
            }}
          >
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
            <InfoWindowBox>
              <Col>
                <Row>
                  <Image src={kakaomap} alt="사진" />
                  <Name>삼성본정형외과의원</Name>
                  <Department>정형외과</Department>
                </Row>
                <BodyText>서울 성북구 아리랑로 7 농혁 건물,2층</BodyText>
                <Phone>02-951-5863</Phone>
                <Row>
                  <Image src={kakaomap} alt="kakao" />
                  <BodyText fontSize="16px">카카오맵에서 길찾기</BodyText>
                </Row>
                <RoundButton width="88px" height="40px" bgColor="rgb(18, 212, 201)" boxShadow={false}>
                  추가
                </RoundButton>
              </Col>
            </InfoWindowBox>
          </CustomOverlayMap>
        </Map>
        <BtnBox width="460px">
          <RoundButton>확인했어요!</RoundButton>
          <RoundButton>다른 병원들도 찾아볼래요</RoundButton>
        </BtnBox>
      </MapContainer>
    </Dim>
  );
};
export default Test;
const InfoWindowBox = styled(Col)`
  background-color: white;
  border: none;
  border-radius: 20px;
  width: 465px;
  height: 272px;
`;
const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
const Department = styled(Box)`
  padding: 10px;
  height: 26px;
  background-color: #363cbf;
  border-radius: 5px;
  color: white;
  font-weight: 600;
`;
const Phone = styled(BodyText)`
  color: ${({ theme }) => theme.color.darkBg};
  font-weight: 800;
`;
const MapContainer = styled(FlexContainer)`
  background-color: white;
  width: 1450px;
  height: 760px;
  flex-direction: column;
  border-radius: 30px;
`;
