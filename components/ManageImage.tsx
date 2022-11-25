import { RecordImage } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteImageApi, uploadImageApi } from "@utils/client/imageApi";
import uploadImage from "@utils/client/uploadImage";
import { RECORDS_READ } from "constant/queryKeys";
import Image from "next/image";
import styled from "styled-components";

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

  return (
    <div>
      <UploadImageButton onClick={() => uploadImage(recordId, uploadImageMutation.mutate)}>사진 추가</UploadImageButton>
      <ImageContainer>
        {recordImage.map((elem, key) => (
          <>
            <ImageBox key={key}>
              <Image src={elem.url} alt="이미지" width={100} height={100} />
              <DeleteButton onClick={() => deleteImageMutation.mutate(elem.id)}></DeleteButton>
            </ImageBox>
          </>
        ))}
      </ImageContainer>
    </div>
  );
}

const ImageBox = styled.div`
  flex: 0 0 auto;
  position: relative;
  & img {
    width: 400px;
    height: 400px;
    object-fit: fill;
  }
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  background-image: url("/delete.png");
  background-position: center;
  background-size: cover;
  right: 5px;
  top: 5px;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 1000px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const UploadImageButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: white;
  cursor: pointer;
`;
