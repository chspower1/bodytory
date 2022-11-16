import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/users/help";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, token }: HelpForm = req.body;
  const { user } = req.session;
  console.log(email, token);
  if (email && !token) {
    const user = await client.user.findFirst({
      where: {
        email,
      },
    });
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";
    if (user) {
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "비밀번호 찾기",
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
      await client.certification.create({
        data: {
          number: payload,
          user: {
            connect: {
              email,
            },
          },
        },
      });
      console.log(result, payload);
      return res.json({
        ok: true,
      });
    } else return res.json({ ok: false });
  }
  if (email && token) {
    const FindToken = await client.certification.deleteMany({
      where: { number: token },
    });
    console.log(FindToken);
    if (FindToken.count > 0) {
      return res.json({ ok: true });
    } else return res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
