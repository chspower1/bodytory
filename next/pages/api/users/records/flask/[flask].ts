import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { flask } = req.query;
  if(!flask) return res.status(401).send("api 주소가 잘못되었습니다");
  if (flask === "allKeywords") return await allRecordsKeywords(req, res);
  if (flask === "threeMonth") return await threeMonthRecordsKeywords(req, res);
}



async function allRecordsKeywords(req: NextApiRequest, res: NextApiResponse) {
  const {user} = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  try{
    const data = await client.record.findMany({
        where:{
          userId: user.id,
        },
        select:{
          description:true
        }
      })
    if(data.length === 0 ) return;
    const result = data.map(ele=>{
      return ele.description
    })
  
    const postApi = await axios.post(`${process.env.FLASK_API}/api/keywords`,{
      headers: {
        "Content-Type": "application/json"
      },
      sentences: result
    })
    return res.status(200).json(postApi.data.keywords_result)
  }catch(err){
    return res.status(401).json({message: "flask 500 error"})
  }
}
async function threeMonthRecordsKeywords(req: NextApiRequest, res: NextApiResponse) {
  const {user} = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  try{
    const now = new Date();
    let threeMonthAgo = new Date();
    threeMonthAgo.setMonth(now.getMonth() - 3);
    const data = await client.record.findMany({
        where:{
          userId: user.id,
          createAt:{
            gte: threeMonthAgo
          }
        },
        select:{
          description:true
        }
      })
    if(data.length === 0 ) return;
    const result = data.map(ele=>{
      return ele.description
    })
  
    const postApi = await axios.post(`${process.env.FLASK_API}/api/keywords`,{
      headers: {
        "Content-Type": "application/json"
      },
      sentences: result
    })
    return res.status(200).json(postApi.data.keywords_result)
  }catch(err){
    return res.status(401).json({message: "flask 500 error"})
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

