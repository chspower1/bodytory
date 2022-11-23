import type { NextApiRequest, NextApiResponse } from "next";
import client from "utils/server/client";
import withHandler from "@utils/server/withHandler";
import { withApiSession } from "@utils/server/withSession";
import multer from "multer";
import nextconnect from "next-connect";
import path from "path";
import { connect } from "http2";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public");
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
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
  const { recordId } = req.body;
  const files = req.files as Express.Multer.File[];
  files.forEach(file => {
    addPicture(recordId, file.filename);
  });
  res.status(200).end();
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

async function addPicture(id: string, fileUrl: string) {
  const data = await client.record.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });
  await client.recordImage.create({
    data: {
      url: `/${fileUrl}`,
      record: {
        connect: {
          id: data?.id!,
        },
      },
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
