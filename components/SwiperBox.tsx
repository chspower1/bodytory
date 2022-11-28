import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

import 'swiper/css';
import "swiper/css/pagination";
import {  Pagination } from "swiper";


const SwiperBox = () => {
  return (
    <SwiperWrap
      slidesPerView={2.5}
      centeredSlides={true}
      pagination={{
        type: "progressbar",
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
    {[1, 2, 3, 4, 5, 6, 7, 8].map((ele, idx) => (
    <SwiperItem>
      <SlideItemInnerBox  >
        <ClinicItemName> 정형외과</ClinicItemName>
        <ClinicListBox>
          정형외과
        </ClinicListBox>
      </SlideItemInnerBox>
    </SwiperItem>
    ))}
  </SwiperWrap>
  )
}

export default SwiperBox;

const SwiperWrap = styled(Swiper)`

  .swiper-pagination{
    position: fixed;
    z-index : 10;
    height:15px;
    top: auto;
    bottom: 0px;
  }
`
const SwiperItem = styled(SwiperSlide)`
  display:flex;
  height:500px;
  padding: 0 50px;
  &.swiper-slide-active{
    >div{
      width:100%;
      height:100%;
    }
  }
`

const SlideItemInnerBox = styled.div`
  width:80%;
  height:80%;
  border-radius: 20px;
  margin: auto auto 0 ;
  transition: height .8s, width .8s;
  display:flex;
  flex-direction:column;
  overflow:hidden;
  &.active{
    
  }
`

const ClinicItemName = styled.div`
  flex-shrink: 0;
  padding: 30px 50px;
  font-size: 27px;
  background : ${({theme}) => theme.color.darkBg};
`;
const ClinicListBox = styled.div`
  height:400px;
  padding: 30px 50px;
  background : ${({theme}) => theme.color.lightBg};
  overflow-y:scroll;
`;
const ClinicListItem = styled.div``;
