// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import savejobs from "../../functions/savejobs";
import multer from "multer";
import savemenu from "../../functions/setmenu";

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
    upload.array();
    upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here
      var data = JSON.parse(JSON.parse(JSON.stringify(req.body)).data);
      var metadata = JSON.parse(JSON.parse(JSON.stringify(req.body)).metadata);
      console.log(metadata);
      savemenu(data, metadata, req, res);
    });
  } catch (err) {
    res.status(200).json({ data: err });
    res.end();
  }
  res.status(200).json({ ok: "sjdf" });
  res.end();
};
