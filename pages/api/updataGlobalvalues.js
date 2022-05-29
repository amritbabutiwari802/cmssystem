import multer from "multer";
import addGlobal from "../../dbservice/addGlobal";

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/global_files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

export default async function operation (req, res)  {
  console.log(req.headers);
  if (req.method != "POST" || req.headers.secret != "skljdfklsdjfkl") {
    res.status(500).json({ dsjkfk: "fjkgtj" });
    console.log("point");
    res.end();
    return;
  }
  try {
    upload.array("file", 3)(req, {}, (err) => {
      // do error handling here
      // do something with the files here
      console.log(JSON.parse(JSON.stringify(req.body)));
      const data = JSON.parse(JSON.stringify(req.body.data));
      data.favicon = "/global_files/" + req.files[0].originalname;
      data.logo = "/global_files/" + req.files[1].originalname;
      const result = addGlobal(data);
      if (result.success) {
        res.status(200).json({ status: "ok" });
      } else {
        res.staus(500);
      }
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
};
