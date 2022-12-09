import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "GET") return await findPatientList(req, res, user);
  if (req.method === "DELETE") return await removePatient(req, res);
}

async function findPatientList(req: NextApiRequest, res: NextApiResponse, user: { id: number }) {
  const foundUser = await client.hospitalToUser.findMany({
    where: {
      hospitalId: user.id,
    },
    select: {
      id: true,
      user: true,
      shared: true,
    },
  });

  return res.status(200).json(foundUser);
}
async function removePatient(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  await client.hospitalToUser.delete({
    where: {
      id,
    },
  });

  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["GET", "DELETE"], handler, isPrivate: false }));
