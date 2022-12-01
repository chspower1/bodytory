import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { Pagination } from "swiper";
import { RectangleButton } from "./button/Button";
import ClinicModal from "./Modal/ClinicModal";


import "swiper/css";
import "swiper/css/pagination";
import customApi from "@utils/client/customApi";
import { useQuery } from "@tanstack/react-query";
import { Record } from "@prisma/client";

const SwiperBox = ({setCurrentHospitalName}:{setCurrentHospitalName: React.Dispatch<React.SetStateAction<number>>}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  const {getApi} = customApi("/api/users/my-hospitals/clinic-list")
  const { isLoading ,data  , error} = useQuery(["clinicListKey"], getApi,{
    onSuccess(data) {
      setCurrentHospitalName(data[0]?.name)
    },
  });
  console.log(data);
  
  return (
    <SwiperWrap
      grabCursor={true}
      pagination={{
        type: "progressbar",
      }}
      slidesPerView={"auto"}
      centeredSlides={true}
      modules={[Pagination]}
      className="mySwiper"
      onSlideChange={(e)=> {
        const currentIdx = e.activeIndex;
        setCurrentHospitalName(data[currentIdx]?.name)
      }}
    >
      {data && data.map((ele : {name :string; address: string; Record : Record[] }, idx: number) => (
        <SwiperSlideItem key={ele.name + ele.address} >
          <SlideItemInnerBox>
            <ItemHeader>
              <HospitalName title="">{ele.name}</HospitalName>
              <HospitalAddress title="">{ele.address}</HospitalAddress>
            </ItemHeader>
            <ClinicListBox>
              {ele.Record.map((obj, idx) => (
                <ClinicItem>
                  <ClinicDate>2022년 11월 09일 일요일 오후 5시 52분</ClinicDate>
                  <ClinicDetailButtonBox>
                    <RectangleButton width="90px" nonSubmit fontSize="16px" onClick={() => setIsModalOpen(true)}>
                      진료내역
                    </RectangleButton>
                  </ClinicDetailButtonBox>
                </ClinicItem>
              ))}
            </ClinicListBox>
          </SlideItemInnerBox>
        </SwiperSlideItem>
      ))}
      {isModalOpen && (
        <ClinicModal
          name={"정형외과정형외과"}
          date={"2022년 11월 09일 일요일  오후 5시 52분"}
          result={"없음"}
          content={"없음"}
          detail={"없음"}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </SwiperWrap>
  );
};

export default SwiperBox;

const SwiperWrap = styled(Swiper)`
  padding: 30px 0 40px; ;
  .swiper-pagination {
    position: absolute;
    z-index: 10;
    height: 8px;
    top: auto;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    border-radius: 10px;
    overflow:hidden;
    background: rgba(49, 54, 167, 0.15);
    span{
      background: rgba(188, 197, 255, 1);
    }
  }
`;
const SwiperSlideItem = styled(SwiperSlide)`
  width: 760px;
  height: 500px;
  opacity: 0.5;
  transition: opacity 0.6s;
  padding: 0 50px;
  &.swiper-slide-active {
    opacity: 1;
    > div {
      transform: scale(1);
    }
  }
`;

const SlideItemInnerBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: transform 0.8s;
  transform: scale(0.8);
  display: flex;
  flex-direction: column;
  box-shadow: 8px 8px 16px rgba(49, 54, 167, 0.15);
  overflow: hidden;
  user-select:none;
`;
const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 30px 50px;
  background: ${({ theme }) => theme.color.darkBg};
  color: ${({ theme }) => theme.color.white};
`;

const HospitalName = styled.div`
  max-width: 100%;
  font-size: 22px;
  margin-right: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const HospitalAddress = styled.div`
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const ClinicListBox = styled.div`
  height: 100%;
  padding: 30px 40px;
  background: ${({ theme }) => theme.color.lightBg};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(188, 197, 255, 1);
    border-radius: 10px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 10px 0 20px;
  }
`;

const ClinicItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background: rgba(188, 197, 255, 1);
  border-radius: 10px;
  & + & {
    margin-top: 10px;
  }
`;

const ClinicDate = styled.div`
  width: 100%;
  font-size: 16px;
`;

const ClinicDetailButtonBox = styled.div``;
