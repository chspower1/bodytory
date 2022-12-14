import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { passwordEncryption } from "utils/server/passwordHelper";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  // if (user?.id === 35) {
  //   return res.status(204).end();
  // }
  const { email, password, accountId } = req.body;
  console.log(accountId, password);
  const hashedPassword = await passwordEncryption(password);
  const foundUser = await client.user.update({
    where: {
      accountId,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!foundUser) {
    return res.status(401).end();
  }

  return res.status(201).end();
};

export default withApiSession(withHandler({ methods: ["PUT"], handler, isPrivate: false }));
