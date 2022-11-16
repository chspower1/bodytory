import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import client from "@libs/server/client";
// const client = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  if(req.method === "DELETE"){
    const findUserPW = await client.user.findUnique({
      where:{
        email
      }
    });
    // const hashedPassword = await bcrypt.compare(password , findUserPW?.password);
    if(password === findUserPW?.password){
      const data = await client.user.delete({
        where:{
          email
        }
      });
      return res.json({ok:true})
    }else{
      return res.status(401).send("현재 비밀번호를 적어주세요");
    }
  }
}
