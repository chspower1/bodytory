import { kakaoInit } from "@utils/client/kakaoInit";
import { useEffect } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";
// const { kakao }: any = window;
const Map = () => {
  // const kakao = kakaoInit();
  // useEffect(() => {
  //   var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  //     mapOption = {
  //       center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
  //       level: 3, // 지도의 확대 레벨
  //     };
  //   var map = new kakao.maps.Map(mapContainer, mapOption);
  // }, []);
  return <div id="map" />;
};
export default Map;
