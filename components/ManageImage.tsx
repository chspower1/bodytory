import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { RECORDS_READ } from "constant/queryKeys";
import React, { InputHTMLAttributes, useEffect } from "react";
import styled from "styled-components";

export default function ManageImage({ recordId }: { recordId: string }) {
  function addPicture(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    // 데이터에 추가 해서 mutate
  }

  function deletePicture(e: React.FormEventHandler<HTMLFormElement>) {
    console.log(e);
    //해당 인덱스 사진 삭제 요청
  }
  async function api(formData: any) {
    await axios.post("/api/users/records/picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation(api, {
    onSuccess: async data => {
      console.log("a");
      console.log(data);
      await queryClient.invalidateQueries([RECORDS_READ]);
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

  return (
    <div>
      <ImageLabel onClick={() => handleImage(recordId)}>사진 추가</ImageLabel>
      <div></div>
    </div>
  );
}

const ImageLabel = styled.button`
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;
