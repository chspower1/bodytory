import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") return await myClinicList(req, res);
};

async function myClinicList(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  const data = await client.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      hospitals: {
        select: {
          hospital: {
            include: {
              records: {
                where: {
                  type: "hospital",
                  userId: user.id,
                },
              },
            },
          },
        },
      },
    },
  });
  return res.status(200).json(data?.hospitals);
}
export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
