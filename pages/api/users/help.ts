import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email }: LoginForm = req.body;
  const user = await client.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "핼린이 ㅎㅇ",
      text: `인증코드 : ${payload}`,
    };
    const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        console.log(error);
        return null;
      } else {
        console.log(responses);
        return null;
      }
    });
    smtpTransport.close();
    console.log(result);
  }
    return res.json({ ok: true });
  } else return res.json({ ok: false });
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
