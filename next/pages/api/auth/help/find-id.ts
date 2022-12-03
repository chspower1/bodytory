import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import { HelpForm } from "pages/auth/help/find-pw";
import { getPayload } from "@utils/client/payload";
import sendMail from "@utils/server/sendMail";

const haveUser = async (email: string) => {
  const user = await client.user.findFirst({
    where: {
      type: "origin",
      email,
    },
  });

  if (!user) throw new Error("이메일 확인 해주세요");

  return user;
};

const createToken = async (email: string) => {
  const user = await haveUser(email);
  const payload = getPayload();

  await client.certification.deleteMany({
    where: { user: { id: user.id } },
  });

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
  sendMail(email, payload, "아이디 찾기");
};

// const sendMail = (email: string, payload: string) => {
//   const mailOptions = {
//     from: process.env.MAIL_ID,
//     to: email,
//     subject: "아이디 찾기",
//     text: `인증코드 : ${payload}`,
//   };
//   smtpTransport.sendMail(mailOptions, (error, responses) => {
//     if (error) {
//       console.log(error);
//       return null;
//     } else {
//       console.log(responses);
//       return null;
//     }
//   });
//   smtpTransport.close();
// };

const deleteToken = async (email: string, token: string) => {
  const findToken = await client.certification.deleteMany({
    where: { number: token, user: { email } },
  });

  if (findToken.count <= 0) throw new Error("인증번호를 확인해주세요");
};

const foundUser = async (email: string, token: string) => {
  const foundUser = await client.user.findFirst({
    where: {
      type: "origin",
      email,
    },
  });
  await deleteToken(email, token);

  if (!foundUser) throw new Error("회원정보가 없습니다");

  return foundUser;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token }: HelpForm = req.body;
  console.log(email, token);
  if (!email) {
    return res.status(400).end();
  }

  if (!token) {
    try {
      await createToken(email);
      res.status(200).json({ ok: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }

  if (token) {
    try {
      const User = await foundUser(email, token);
      res.status(200).json({ ok: true, data: User?.accountId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (<Object>error).toString();
      res.status(403).send(errorMessage);
    }
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler, isPrivate: false }));
