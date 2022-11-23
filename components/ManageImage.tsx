import axios from "axios";
import React, { InputHTMLAttributes, useEffect } from "react";
import styled from "styled-components";

export default function ManageImage() {
  function addPicture(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    // 데이터에 추가 해서 mutate
  }

  function deletePicture(e: React.FormEventHandler<HTMLFormElement>) {
    console.log(e);
    //해당 인덱스 사진 삭제 요청
  }

  return (
    <div>
      <ImageLabel htmlFor="multi-image" onClick={handleImage}>
        사진 추가
      </ImageLabel>
      <div></div>
    </div>
  );
}

function handleImage() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.multiple = true;
  input.click();

  input.addEventListener("change", async () => {
    try {
      const formData = new FormData();
      console.log(input.files);
      Array.from(input?.files!).forEach(file => formData.append("image", file));
      await axios.post("/api/users/records/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
}

const ImageLabel = styled.label`
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;
