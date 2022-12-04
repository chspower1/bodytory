import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { Pagination } from "swiper";
import { RectangleButton } from "./buttons/Button";
import ClinicModal from "./modals/ClinicModal";
import customApi from "@utils/client/customApi";
import { useQuery } from "@tanstack/react-query";
import { Record } from "@prisma/client";
import { changeDate } from "@utils/client/changeDate";
import { Row } from "@styles/Common";
import sliceName from "@utils/client/sliceHospitalName";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { currentHospitalIdx } from "atoms/atoms";

import "swiper/css";
import "swiper/css/pagination";

const SwiperBox = ({
  setCurrentHospitalName,
}: {
  setCurrentHospitalName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  const hospitalCurrentIdx = useRecoilValue(currentHospitalIdx);
  const { getApi } = customApi("/api/users/my-hospitals/clinic-list");
  const { isLoading, data, error } = useQuery(["clinicListKey"], getApi);

  const handleClickModalOpen = (obj: Record, name: string) => () => {
    setIsModalOpen(true);
    setCurrentContent({ ...obj, name });
  };

  useEffect(() => {
    if (data) setCurrentHospitalName(String(sliceName(data[hospitalCurrentIdx]?.hospital.name)));
  }, [data, hospitalCurrentIdx]);

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
      onSlideChange={e => {
        const idx = e.activeIndex;
        if (data) setCurrentHospitalName(String(sliceName(data[idx]?.hospital.name)));
      }}
      initialSlide={hospitalCurrentIdx}
    >
      {data &&
        data.map(({ hospital }: { hospital: { name: string; address: string; records: Record[] } }, idx: number) => (
          <SwiperSlideItem key={`${hospital.name} + ${hospital.address}`}>
            <SlideItemInnerBox>
              <ItemHeader>
                <HospitalName title={hospital.name}>{sliceName(hospital.name)}</HospitalName>
                <HospitalAddress title={hospital.address}>{hospital.address}</HospitalAddress>
              </ItemHeader>
              <ClinicListBox>
                {hospital.records.length >= 1 ? (
                  hospital.records.map((obj, idx) => (
                    <ClinicItem key={`${obj.userId} + ${obj.id} + ${Date.now()}`}>
                      <ClinicDate>{changeDate(obj.createAt)}</ClinicDate>
                      <ClinicDetailButtonBox>
                        <RectangleButton
                          width="90px"
                          nonSubmit
                          fontSize="16px"
                          onClick={handleClickModalOpen(obj, hospital.name)}
                        >
                          진료내역
                        </RectangleButton>
                      </ClinicDetailButtonBox>
                    </ClinicItem>
                  ))
                ) : (
                  <BlankCommentBox>
                    <p>진료 내역이 없어요</p>
                  </BlankCommentBox>
                )}
              </ClinicListBox>
            </SlideItemInnerBox>
          </SwiperSlideItem>
        ))}
      {currentContent && <ClinicModal {...currentContent} show={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </SwiperWrap>
  );
};

export default SwiperBox;

const SwiperWrap = styled(Swiper)`
  padding: 30px 0 40px;
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
    overflow: hidden;
    background: rgba(49, 54, 167, 0.15);
    span {
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
  user-select: none;
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
  max-width: 50%;
  font-size: 22px;
  margin-right: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
`;
const HospitalAddress = styled.div`
  font-size: 18px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
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

const BlankCommentBox = styled(Row)`
  width: 100%;
  height: 100%;
`;
