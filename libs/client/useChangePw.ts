import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const basicApi = ()=>
  axios.create({
    headers: {
      "Content-Type": "application/json",
  },
})

export const changePasswordApi = async(data:any) =>{
  try{
    const res = await basicApi().put("/api/account", data)
    console.log(res)
  }catch(err: any){
    // console.log(err);
    throw err.response.data
  }
}
