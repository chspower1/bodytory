/**
 * 선택한 이미지 파일을 formdata로 만들어 인자값으로 넘겨준 mutate를 통해 사진 업로드를 한다
 * @param id -recordId
 * @param mutate  - mutate 함수
 */

const uploadImage = (id: string, mutate: any) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.multiple = true;
  input.click();

  input.addEventListener("change", async () => {
    try {
      const formData = new FormData();
      formData.append("recordId", id);
      Array.from(input?.files!).forEach(file => formData.append("image", file));
      mutate(formData);
    } catch (err) {}
  });
};

export default uploadImage;
