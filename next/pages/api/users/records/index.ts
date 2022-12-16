import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  if (user?.id === 35) return res.status(204).end();
  if (req.method === "POST") return await createRecord(req, res, user);

  if (req.method === "GET") return await findRecord(req, res, user);

  if (req.method === "PUT") return await updateRecord(req, res);

  if (req.method === "DELETE") return await deleteRecord(req, res);
};

async function createRecord(req: NextApiRequest, res: NextApiResponse, user: { id: number }) {
  const { position, description } = req.body;
  if (!user) return res.status(400).end();
  const departments = await axios.post(`${process.env.FLASK_API}/api/departments`, {
    sentence: description,
  });
  await client.record.create({
    data: {
      type: "user",
      position,
      description,
      recommendDepartments: departments.data.departments_result as string,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  return res.status(200).end();
}

async function findRecord(req: NextApiRequest, res: NextApiResponse, user: { id: number }) {
  const data = await client.record.findMany({
    where: {
      userId: user.id,
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

async function updateRecord(req: NextApiRequest, res: NextApiResponse) {
  const { id, position, description } = req.body;
  const departments = await axios.post(`${process.env.FLASK_API}/api/departments`, {
    sentence: description,
  });
  await client.record.update({
    where: {
      id,
    },
    data: {
      position,
      description,
      recommendDepartments: departments.data.departments_result as string,
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
