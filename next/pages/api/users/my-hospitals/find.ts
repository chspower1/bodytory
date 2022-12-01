import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import client from "utils/server/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") return await findHospital(req, res);
};

async function findHospital(req: NextApiRequest, res: NextApiResponse) {
  const { search } = req.body;
  const { page } = req.query;
  const pagenation = Number(page) * 10;
  const foundHospital = await client.hospital.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    include: {
      medicalDepartments: {
        include: {
          medicalDepartment: true,
        },
      },
    },
    take: 10,
  });
  if (!foundHospital) return res.status(400).end();

  res.status(200).json(foundHospital);
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
