import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/users/help";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email } = req.query;
  console.log(email);
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
