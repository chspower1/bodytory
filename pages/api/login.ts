import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/login";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, password }: LoginForm = req.body;
  const user = await client.user.findFirst({
    where: {
      email,
      password,
    },
  });
  if (user) {
    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    return res.json({ ok: true });
  } else return res.json({ ok: false });
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
