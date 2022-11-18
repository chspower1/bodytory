import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { WriteRecord } from "pages/write";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, position, description }: WriteRecord = req.body;
  const { user } = req.session;
  if (req.method === "POST") {
    // await client.user.update({
    //   where:{
    //     id : user?.id,
    //   },
    //   data:{
    //     records:{
    //       type: "user"
    //     }
    //   }
    // })
    await client.record.create({
      data: {
        type: "user",
        position: "arm",
        description: "test",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "DELETE"], handler }));
