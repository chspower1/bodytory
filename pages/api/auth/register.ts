import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import * as bcrypt from "bcrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, email, name, age, gender } = req.body;

  await client.user.create({
    data: {
      name,
      age: Number(age),
      gender,
      email,
      password: await bcrypt.hash(password, 12),
    },
  });
  return res.status(200).end();
}
export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
