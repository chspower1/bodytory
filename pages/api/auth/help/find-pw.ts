import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { LoginForm } from "pages/auth/login";
import smtpTransport from "@libs/server/email";
import { HelpForm } from "pages/auth/help/find-pw";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, accountId }: HelpForm = req.body;
  const isAuthenticationRequest = accountId && !token;
  const isAuthenticationNumberSubmit = accountId && token;

  if (isAuthenticationRequest) {
    const foundUser = await client.user.findFirst({
      where: {
        accountId,
        type: "origin",
      },
    });
    const payload = Math.floor(10000 + Math.random() * 1000000) + "";

    if (!foundUser) {
      return res.status(403).send("아이디를 확인해주세요");
    } else {
      // 이메일 보내기
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: foundUser.email,
        subject: "비밀번호 찾기",
        text: `인증코드 : ${payload}`,
      };
      await smtpTransport.sendMail(mailOptions, (error, responses) => {
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
      const certification = await client.certification.create({
        data: {
          number: payload,
          user: {
            connect: {
              id: foundUser.id,
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
        email: certification.user?.email,
        accountId: certification.user?.accountId,
      });
    }
  }
  if (isAuthenticationNumberSubmit) {
    const foudToken = await client.certification.deleteMany({
      where: {
        number: token,
        AND: {
          user: {
            accountId,
          },
        },
      },
    });

    console.log(foudToken);
    if (foudToken.count > 0) {
      await client.user.update({
        where: {
          accountId,
        },
        data: {
          Certification: {
            deleteMany: {},
          },
        },
      });
      return res.status(201).end();
    } else return res.status(403).send("토큰 값을 확인해주세요");
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
