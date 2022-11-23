import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import multer from "multer";
import nextconnect from "next-connect";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./images");
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const handler = nextconnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    res.status(500).end("something broke");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("not fiund");
  },
});

const upload = multer({ storage: storage });

handler.post(upload.array("image"), (req, res) => {
  //   res.status(200).json(req.files?.map(array => v.filename));
  //   res.json(req.files?.map((v: { filename: any }) => v.filename));
});

async function addPicture(req: NextApiRequest) {
  const { id, addimages } = req.body;
  const data = await client.record.findFirst({
    where: {
      id,
    },
    select: {
      images: true,
    },
  });

  await client.record.update({
    where: {
      id,
    },
    data: {
      images: data + addimages,
    },
  });
}
function saveImage() {}
async function updatePicture(req: NextApiRequest) {
  const { id, images } = req.body;
  await client.record.update({
    where: {
      id,
    },
    data: {
      images,
    },
  });
}

export default handler;
