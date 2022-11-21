import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/auth/help/find-pw";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token, type }: HelpForm = req.body;
  console.log(email, token);
  if (email && !token) {
    const user = await client.user.findFirst({
      where: {
        type,
        email,
      },
    });
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";
    if (user) {
      return res.status(403).send("중복된 이메일입니다");
    } else {
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "이메일 인증",
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

      await client.certification.deleteMany({
        where: { email },
      });

      await client.certification.create({
        data: {
          number: payload,
          email,
        },
      });
      console.log(payload);
      return res.status(200).json({
        ok: true,
      });
    }
  }
  if (email && token) {
    const FindToken = await client.certification.deleteMany({
      where: {
        number: token,
        email,
      },
    });
    console.log(FindToken);
    if (FindToken.count > 0) return res.status(200).json({ ok: true, data: "인증 되었습니다" });
    else return res.status(403).send("인증번호를 확인해주세요");
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
