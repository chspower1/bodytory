import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/users/help";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, accountId }: HelpForm = req.body;
  console.log(accountId, token);
  if (accountId && !token) {
    const foundUser = await client.user.findFirst({
      where: {
        accountId,
        type: "origin",
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
      const certification = await client.certification.create({
        data: {
          number: payload,
          user: {
            connect: {
              accountId,
            },
          },
        },
        include: {
          user: {
            select: {
              accountId: true,
              email: true,
            },
          },
        },
      });
      console.log(payload, certification);
      return res.status(201).json({
        email: certification.user.email,
        accountId: certification.user.accountId,
      });
    } else return res.status(403).send("인증에 실패하였습니다");
  }
  if (accountId && token) {
    const foudToken = await client.certification.deleteMany({
      where: { number: token },
    });
    console.log(foudToken);
    if (foudToken.count > 0) return res.status(201).end();
    else return res.status(403).send("토큰 값을 확인해주세요");
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
