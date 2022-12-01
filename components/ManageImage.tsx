import { RecordImage } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageApi, uploadImageApi } from "@utils/client/imageApi";
import uploadImage from "@utils/client/uploadImage";
import { RECORDS_READ } from "constant/queryKeys";
import Image from "next/image";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Mousewheel } from "swiper";
import { useState } from "react";
import IconAddImage from "@public/static/icon/icon_addImage.png";

export default function ManageImage({ recordId, recordImage }: { recordId: string; recordImage: RecordImage[] }) {
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation(uploadImageApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const deleteImageMutation = useMutation(deleteImageApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const [isHover, setIsHover] = useState(-1);

  return (
    <div>
      <UploadImageButton onClick={() => uploadImage(recordId, uploadImageMutation.mutate)}>사진 추가</UploadImageButton>
      {recordImage.length !== 0 ? (
        <ImageSlideContainer>
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            mousewheel={true}
            navigation={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            modules={[Pagination, Navigation, Mousewheel]}
            className="mySwiper"
          >
            {recordImage.map((elem, key) => (
              <SwiperSlide key={key}>
                <ImageBox onMouseEnter={() => setIsHover(key)} onMouseLeave={() => setIsHover(-1)}>
                  <Image src={elem.url} alt="증상 이미지" width={100} height={100} />
                  {isHover === key && <DeleteButton onClick={() => deleteImageMutation.mutate(elem.id)}></DeleteButton>}
                </ImageBox>
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageSlideContainer>
      ) : (
        <NoImage>증상과 관련된 이미지를 추가해주세요</NoImage>
      )}
    </div>
  );
}

const ImageSlideContainer = styled.div`
  width: 100%;
  height: 300px;

  .swiper {
    padding-bottom: 20px;
  }

  .swiper-slide {
    width: 300px;
    border-radius: 15px;
    overflow: hidden;
    cursor: grab;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #5155ba;
    color: rgba(255, 255, 255, 1);
    transition: opacity 0.3s;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 14px;
  }

  .swiper-button-disabled {
    opacity: 0;
  }

  .swiper-horizontal > .swiper-pagination-progressbar,
  .swiper-pagination-progressbar.swiper-pagination-horizontal {
    top: auto;
    bottom: 0;
    height: 8px;
    border-radius: 8px;
  }

  .swiper-pagination-progressbar {
    background: #ebecfc;
  }

  .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
    background: #c6cdfa;
    border-radius: 8px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background: #2b2d64;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  &:hover img {
    opacity: 0.7;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
  background: url("/delete.png") no-repeat 50% 50%/80%;
`;

const UploadImageButton = styled.button`
  display: block;
  height: 40px;
  padding: 0 20px 0 50px;
  margin: 0 0 20px auto;
  background: #8085fa url(${IconAddImage.src}) no-repeat 15px 50%/24px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

const NoImage = styled.div`
  width: 100%;
  height: 300px;
  background: #f4f7f9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #a9a9a9;
`;
