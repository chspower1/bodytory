import { RecordImage } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import IconAddImage from "@src/assets/icons/icon_addImage.png";
import ImageDetailModal from "./modals/ImageDetailModal";
import customApi from "@utils/client/customApi";

const ManageImage = ({
  recordId,
  recordImages,
  isHospital,
}: {
  recordId: number;
  recordImages: RecordImage[];
  isHospital?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { postApi, deleteApi } = customApi("/api/users/records/picture");
  const { mutate: uploadImageMutate } = useMutation(postApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });

  const { mutate: deleteImageMutate } = useMutation(deleteApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const [showImageDetailModal, setShowImageDetailModal] = useState(-1);
  const [isHover, setIsHover] = useState(-1);
  return (
    <div>
      {isHospital || (
        <UploadImageButton onClick={() => uploadImage(recordId, uploadImageMutate)}>사진 추가</UploadImageButton>
      )}
      {recordImages.length !== 0 ? (
        <ImageSlideContainer>
          <Swiper
            pagination={{
              clickable: true,
            }}
            mousewheel={true}
            navigation={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            modules={[Pagination, Navigation, Mousewheel]}
            className="mySwiper"
          >
            {recordImages.map((recordImage, key) => (
              <SwiperSlide key={key}>
                <ImageBox onMouseEnter={() => setIsHover(key)} onMouseLeave={() => setIsHover(-1)}>
                  <Image
                    src={recordImage.url}
                    alt="증상 이미지"
                    width={300}
                    height={300}
                    onClick={() => {
                      setShowImageDetailModal(key);
                    }}
                  />
                  {isHover === key && <DeleteButton onClick={() => deleteImageMutate({ imageId: recordImage.id })} />}

                  <ImageDetailModal
                    show={showImageDetailModal}
                    onClose={() => setShowImageDetailModal(-1)}
                    setShow={setShowImageDetailModal}
                    url={recordImage.url}
                    index={key}
                    imagesLength={recordImages.length}
                  />
                </ImageBox>
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageSlideContainer>
      ) : (
        <NoImage>{isHospital ? "이미지가 없어요" : "증상과 관련된 이미지를 추가해주세요"}</NoImage>
      )}
    </div>
  );
};
export default ManageImage;
const ImageSlideContainer = styled.div`
  width: 100%;
  height: 300px;

  .swiper {
    padding-bottom: 40px;
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

  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal {
    top: auto;
    bottom: 0;
    border-radius: 8px;
  }

  .swiper-pagination-bullet {
    background: #c6cdfa;
    opacity: 1;
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background: #8085fa;
    opacity: 1;
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
  background-color: red;
  /* background: url("../src/assets/icons/delete.png") no-repeat 50% 50%/80%; */
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
