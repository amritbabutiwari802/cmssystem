// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import savejobs from "../../functions/savejobs";
import multer from "multer";
import savemenu from "../../functions/setmenu";
import setglobal from "../../functions/setglobal";
import { setmedia } from "../../functions/saveimages";

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

export default async (req, res) => {
  console.log("apis");
  try {
    await upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here

      setmedia(req, res);
    });
  } catch (err) {}
};
