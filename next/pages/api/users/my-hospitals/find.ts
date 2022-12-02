import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import client from "utils/server/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await findHospital(req, res);
};

async function findHospital(req: NextApiRequest, res: NextApiResponse) {
  const { page, search } = req.query;
  console.log(page, "page", search, "search");
  const pagenation = Number(page) * 10;
  const foundHospitalTotal = await client.hospital.findMany({
    where: {
      name: {
        contains: String(search),
      },
    },
    include: {
      medicalDepartments: {
        include: {
          medicalDepartment: true,
        },
      },
    },
  });

  const foundHospital = await client.hospital.findMany({
    where: {
      name: {
        contains: String(search),
      },
    },
    include: {
      medicalDepartments: {
        include: {
          medicalDepartment: true,
        },
      },
    },
    skip: pagenation,
    take: 10,
  });
  if (!foundHospital) return res.status(400).end();

  const lastPage = foundHospitalTotal.length < pagenation;
  res.status(200).json({ foundHospital, status: lastPage });
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
