import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import fs from "fs";
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body;
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  // const audio = fs.readFileSync(url, {
  //   encoding: "base64",
  // });
  console.log(url);
  console.log("백엔드 동작");
  const PostAudio = async () => {
    const aa = await (
      await fetch("http://aiopen.etri.re.kr:8000/WiseASR/Recognition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "8b10a352-acfc-483c-9816-52dbdc37181a",
        },
        body: JSON.stringify({
          request_id: "chspower1@naver.com",
          argument: {
            language_code: "korean",
            audio: audio,
          },
        }),
      })
    ).json();
    console.log(aa);
  };
  // const result = PostAudio();
  return res.status(200);
  // return res.json(result);
}

export default withApiSession(withHandler({ methods: ["POST", "GET", "PUT", "DELETE"], handler }));
