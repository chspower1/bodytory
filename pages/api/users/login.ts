import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";
import bcrypt from "bcrypt";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, autoLogin }: LoginForm = req.body;
  const foundUser = await client.user.findFirst({
    where: {
      email,
    },
  });
  const isPasswordCorrect = await bcrypt.compare(password, foundUser?.password!);
  if (isPasswordCorrect && foundUser) {
    req.session.user = {
      id: foundUser.id,
    };
    await req.session.save();
    return res.status(201);
  } else {
    return res.status(401).send("회원정보를 확인해주세요");
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
