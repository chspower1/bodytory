import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import client from "utils/server/client";
import { PrismaClient } from "@prisma/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await findHospital(req, res);
};

async function findHospital(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { page, search } = req.query;
  console.log(page, "page", search, "search");
  const pagenation = Number(page) * 10;
  if (!user) return res.status(401).end();
  const foundMyHospitals = await client.hospital.findMany({
    where: {
      name: {
        search: String(search),
      },
      NOT: {
        users: {
          none: {
            userId: user.id,
          },
        },
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
  const foundNotMyHospitals = await client.hospital.findMany({
    where: {
      name: {
        search: String(search),
      },
      NOT: {
        users: {
          some: {
            userId: user.id,
          },
        },
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
  const foundHospitals = [
    ...foundMyHospitals.map(hospital => ({ ...hospital, my: true })),
    ...foundNotMyHospitals.map(hospital => ({ ...hospital, my: false })),
  ];
  const isLastPage = foundHospitals.length === 0 ? true : false;
  console.log("등록된", foundMyHospitals, "등록 안된", foundNotMyHospitals);
  res.status(200).json({ foundHospitals, status: isLastPage });
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
