import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import * as bcrypt from "bcrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { password, email, name, age, gender } = req.body;
  if (await isDuplicateEmail(email)) {
    res.status(404).send("회원가입 실패");
  }
  await client.user.create({
    data: {
      name,
      age: Number(age),
      gender,
      email,
      password: await bcrypt.hash(password, 12),
    },
  });
  res.status(200).json({ ok: true });
}

function isCorrectEmail(email: string) {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const result = regex.test(email);

  return result;
}

async function isDuplicateEmail(email: string) {
  const foundEmail = await client.user.findFirst({
    where: {
      email: email,
    },
  });

  return foundEmail ? true : false;
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
