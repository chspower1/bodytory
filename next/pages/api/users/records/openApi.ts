import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.session;
  if (!user) return res.status(401).send("회원 정보를 확인해주세요");
  return await createRecord(req, res);
};

async function createRecord(req: NextApiRequest, res: NextApiResponse) {
  const { audio } = req.body;
  const audioRecognized = await axios.post(
    "http://aiopen.etri.re.kr:8000/WiseASR/Recognition",
    {
      request_id: "chspower1@naver.com",
      argument: {
        language_code: "korean",
        audio,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AI_API_KEY,
      },
    },
  );

  return res.status(200).json(audioRecognized.data?.return_object?.recognized);
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
