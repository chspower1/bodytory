import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { NextResponse } from "next/server";
import { Position } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { position, patientId } = req.query;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "GET") return await findRecord(req, res, position as Position, patientId as string);
}

async function findRecord(req: NextApiRequest, res: NextApiResponse, position: Position, patientId : string) {
  const { user } = req.session;
  const data = await client.record.findMany({
    where: {
      userId : Number(patientId),
      position: position,
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
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
