import axios from "axios";

export async function uploadImageApi(formData: any) {
  return await axios.post("/api/users/records/picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function deleteImageApi(id: number) {
  const form = new FormData();
  form.append("id", String(id));
  return await axios.delete(`/api/users/records/${id}`);
}
