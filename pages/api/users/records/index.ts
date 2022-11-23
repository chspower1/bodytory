import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "POST") return await createRecord(req, res);

  if (req.method === "GET") return await findRecord(req, res);

  if (req.method === "PUT") return await updateRecord(req, res);

  if (req.method === "DELETE") return await deleteRecord(req, res);
}

async function createRecord(req: NextApiRequest, res: NextApiResponse) {
  const { type, position, description } = req.body;
  const { user } = req.session;
  await client.record.create({
    data: {
      type,
      position,
      description,
      user: {
        connect: {
          id: user!.id,
        },
      },
    },
  });
  return res.status(200).end();
}

async function findRecord(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const data = await client.record.findMany({
    where: {
      userId: user!.id,
    },
    include: { images: true },
  });
  return res.status(200).json(data);
}

async function updateRecord(req: NextApiRequest, res: NextApiResponse) {
  const { id, position, description } = req.body;
  await client.record.update({
    where: {
      id,
    },
    data: {
      position,
      description,
    },
  });
  return res.status(200).end();
}

async function deleteRecord(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  await client.record.delete({
    where: {
      id,
    },
  });
  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
