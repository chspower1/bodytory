import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const basicApi = () =>
  axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postApi = async (url: string, data: any) => {
  try {
    const result = await basicApi().post(url, data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
export const getApi = async (url: string) => {
  try {
    const result = await basicApi().get(url);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteApi = async (url: string, data: any) => {
  try {
    const result = await basicApi().post(url, data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const putApi = async (url: string, data: any) => {
  try {
    const result = await basicApi().put(url, data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const changePasswordApi = async (data: any) => {
  try {
    const res = await basicApi().put("/api/users/edit", data);
    return res.data;
  } catch (err: any) {
    // console.log(err);
    throw err.response.data;
  }
};
export const withdrawApi = async ({ password }: any) => {
  try {
    const res = await basicApi().delete("/api/users/withdraw", {
      data: {
        password,
      },
    });
    return res.data;
  } catch (err: any) {
    // console.log(err);
    throw err.response.data;
  }
};
