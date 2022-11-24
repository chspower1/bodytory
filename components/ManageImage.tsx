import { RecordImage } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RECORDS_READ } from "constant/queryKeys";
import React, { InputHTMLAttributes, useEffect } from "react";
import styled from "styled-components";

export default function ManageImage({ recordId, recordImage }: { recordId: string; recordImage: RecordImage[] }) {
  async function api(formData: any) {
    return await axios.post("/api/users/records/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  const queryClient = useQueryClient();
  const { mutate } = useMutation(api, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  const deleteTest = useMutation(deleteImage, {
    onSuccess(data) {
      queryClient.invalidateQueries([RECORDS_READ]);
    },
  });
  function handleImage(id: string) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.multiple = true;
    input.click();

    input.addEventListener("change", async () => {
      try {
        const formData = new FormData();
        console.log(input.files);
        formData.append("recordId", id);
        Array.from(input?.files!).forEach(file => formData.append("image", file));

        mutate(formData);

        console.log("보냄");
      } catch (err) {
        console.log(err);
      }
    });
  }

  async function deleteImage(id: number) {
    console.log(id);
    const form = new FormData();
    form.append("id", String(id));
    await axios.delete(`/api/users/records/${id}`);
  }
  return (
    <div>
      <ImageLabel onClick={() => handleImage(recordId)}>사진 추가</ImageLabel>
      <ImageBox>
        {recordImage.map((elem, key) => (
          <>
            <TestDiv>
              <img src={elem.url} alt="이미지" />
              <DeleteButton onClick={() => deleteTest.mutate(elem.id)}>삭제</DeleteButton>
            </TestDiv>
          </>
        ))}
      </ImageBox>
    </div>
  );
}

const TestDiv = styled.div`
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
  background-color: red;
  right: 0;
`;

const ImageBox = styled.div`
  display: flex;
  width: 1000px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ImageLabel = styled.button`
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;
