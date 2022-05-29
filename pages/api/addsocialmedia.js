import multer from "multer";
import addGlobal from "../../dbservice/addGlobal";
import addsms from "../../dbservice/socialmedia";

export const config = {
  api: {
    bodyParser: false,
  },
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/smsfiles");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

export default async function socialmedia (req, res) {
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

      data.logo = "/smsfiles/" + req.files[0].originalname;
      const result = addsms(data);
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
