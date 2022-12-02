import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import client from "utils/server/client";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await findHospital(req, res);
};

async function findHospital(req: NextApiRequest, res: NextApiResponse) {
  const { page, search } = req.query;
  console.log(page, "page", search, "search");
  const pagenation = Number(page) * 10;
  const foundHospital = await client.hospital.findMany({
    where: {
      name: {
        search: "병원",
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
  const isLastPage = foundHospital.length === 0 ? true : false;

  res.status(200).json({ foundHospital, status: isLastPage });
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
