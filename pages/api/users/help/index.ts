import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/users/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/users/help";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, token }: HelpForm = req.body;
  console.log(email, token);
  if (email && !token) {
    const foundUser = await client.user.findFirst({
      where: {
        email,
      },
    });
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";

    if (foundUser) {
      // 이메일 보내기
      // const mailOptions = {
      //   from: process.env.MAIL_ID,
      //   to: email,
      //   subject: "비밀번호 찾기",
      //   text: `인증코드 : ${payload}`,
      // };
      // const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
      //   if (error) {
      //     console.log(error);
      //     return null;
      //   } else {
      //     console.log(responses);
      //     return null;
      //   }
      // });
      // smtpTransport.close();
      // 토큰 생성
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
      console.log(payload);
      return res.json({
        ok: true,
      });
    } else return res.json({ ok: false });
  }
  if (email && token) {
    const foudToken = await client.certification.deleteMany({
      where: { number: token },
    });
    console.log(foudToken);
    if (foudToken.count > 0) return res.json({ ok: true });
    else return res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
