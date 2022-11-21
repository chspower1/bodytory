import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/auth/help";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token }: HelpForm = req.body;
  console.log(email, token);
  if (email && !token) {
    const user = await client.user.findFirst({
      where: {
        type: "origin",
        email,
      },
    });
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";

    if (user) {
      // 이메일 보내기
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "아이디 찾기",
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
      // 토큰 생성
      await client.certification.create({
        data: {
          number: payload,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      console.log(payload);
      return res.status(200).json({
        ok: true,
      });
    } else return res.status(403).send("이메일을 확인해주세요");
  }
  if (email && token) {
    const FindToken = await client.certification.deleteMany({
      where: { number: token },
    });
    const foundUser = await client.user.findFirst({
      where: {
        type: "origin",
        email,
      },
    });
    console.log(FindToken);
    if(!foundUser) return res.status(403).send("회원정보를 확인해주세요");
    if (FindToken.count > 0) return res.status(200).json({ ok: true, data: foundUser?.accountId });
    else return res.status(403).send("인증번호를 확인해주세요");
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
