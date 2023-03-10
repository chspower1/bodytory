import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { Position } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  const { position } = req.query;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "GET") return await findRecord(req, res, position as Position);
};

async function findRecord(req: NextApiRequest, res: NextApiResponse, position: Position) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const data = await client.record.findMany({
    where: {
      userId: user.id,
      position: position,
    },
    include: {
      images: true,
      hospital: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  return res.status(200).json(data);
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
