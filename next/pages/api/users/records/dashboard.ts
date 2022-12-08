import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { NextResponse } from "next/server";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const now = new Date();
  let aMonthAgo = new Date();
  aMonthAgo.setMonth(now.getMonth() -1);
  let threeMonthAgo = new Date();
  threeMonthAgo.setMonth(now.getMonth() -3);

  console.log("now",now)
  console.log("aMonth",aMonthAgo)
  console.log("3Month",threeMonthAgo)

  const data = await client.record.findMany({
    where: {
      userId: user.id,
      createAt:{
        gte: aMonthAgo
      }
    },
  });


  console.log(data)






  return res.status(200).end();
}


export default withApiSession(withHandler({ methods: ["GET"], handler }));
