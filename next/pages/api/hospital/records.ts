import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "POST") return await createRecord(req, res);
  if (req.method === "DELETE") return await removeRecord(req, res);
};

async function createRecord(req: NextApiRequest, res: NextApiResponse) {
  const { patientId, position, description, diagnosis, prescription, createAt } = req.body;
  const { user } = req.session;

  if (!user) return res.status(401).end();

  await client.record.create({
    data: {
      type: "hospital",
      position,
      description,
      diagnosis,
      prescription,
      hospitalId: user.id,
      userId: patientId,
      createAt,
    },
  });

  return res.status(200).end();
}
async function removeRecord(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  console.log(id);
  if (!id) return res.status(401).send("recordId를 확인해주세요");
  await client.record.delete({
    where: {
      id,
    },
  });

  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["POST", "DELETE"], handler, isPrivate: false }));
