// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import savejobs from "../../functions/savejobs";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

export default async function operation (req, res) {
  try {
    upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here

      savejobs(req, res);
    });
  } catch (err) {
    res.status(200).json({ data: err });
    res.end();
  }
};
