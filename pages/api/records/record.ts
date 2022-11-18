import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, createAt, type, position, description } = req.body;
  const { user } = req.session;
  if (req.method === "POST") {
    await client.record.create({
      data: {
        type,
        position,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.status(200).end()
  }
  if(req.method === "GET"){
    const data = await client.record.findMany({
      where:{
        userId: user?.id,
      }
    })
    return res.status(200).json(data)
  }
  if(req.method === "PUT"){
    await client.record.update({
      where: {
        id
      },
      data: {
        position,
        description,
      },
    })
    return res.status(200).end()
  }
  if(req.method === "DELETE"){
    await client.record.delete({
      where: {
        id
      }
    })
    return res.status(200).end()
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
