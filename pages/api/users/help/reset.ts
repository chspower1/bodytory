import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/users/help";
import bcrypt from "bcrypt";
async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(email, password);
  const user = await client.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });
  if (user) {
    return res.json({ ok: true });
  } else {
    return res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
