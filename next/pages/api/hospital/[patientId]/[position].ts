import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { Position } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { position, patientId } = req.query;
  if (!position || !patientId) return res.status(401).send("api 주소가 잘못되었습니다");
  const data = await client.record.findMany({
    where: {
      userId: Number(patientId),
      position: position as Position,
    },
    include: {
      images: true,
      user: true,
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
};

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
