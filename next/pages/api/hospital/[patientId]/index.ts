import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");

  if (req.method === "GET") return await findPatient(req, res);
  if (req.method === "DELETE") return await removePatient(req, res);
}

async function findPatient(req: NextApiRequest, res: NextApiResponse) {
  const { patientId } = req.query;
  if (!patientId) return res.status(401).send("환자의 id가 없습니다") ;
  const foundPatient = await client.user.findFirst({
    where: {
      id: Number(patientId)
    },
    select:{
      name:true,
      gender:true,
      birth: true
    }
  });

  return res.status(200).json(foundPatient);
}
async function removePatient(req: NextApiRequest, res: NextApiResponse) {
  const { patientId } = req.query;
  const { id } = req.body;
  if (!id) return res.status(401).send("id를 확인 해주세요") ;
  if(patientId !== "removePatient") return res.status(401).send("api 주소를 확인해주세요")
  await client.hospitalToUser.delete({
    where: {
      id,
    },
  });

  return res.status(200).end();
}

export default withApiSession(withHandler({ methods: ["GET","DELETE"], handler, isPrivate: false }));
