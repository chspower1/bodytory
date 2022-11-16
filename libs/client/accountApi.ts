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
    const res = await basicApi().put("/api/changePw", data)
  }catch(err: any){
    // console.log(err);
    throw err.response.data
  }
}
export const withdrawApi = async({password}:any) =>{
  try{
    const res = await basicApi().delete("/api/withdraw", {
      data :{
        password
      }
    })
    return res.data
  }catch(err: any){
    // console.log(err);
    throw err.response.data
  }
}
