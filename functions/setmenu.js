import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "menu",
};

const savemenu = (req, res) => {
  getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      var schema = session.getSchema(config.schema);
      schema
        .existsInDatabase()
        .then((exists) => {
          if (exists) {
            return schema;
          }
          return session.createSchema(config.schema);
        })
        .then((schema) => {
          return schema.createCollection(config.collection, {
            reuseExisting: true,
          });
        })
        .then((collection) => {
          const menu = JSON.parse(JSON.parse(JSON.stringify(req.body)).menu);
          const data = JSON.parse(JSON.parse(JSON.stringify(req.body)).data);
          console.log(menu);
          const temp = {};
          if (data.hasimage) {
            temp.img = "/uploads/" + req.files[0].originalname;
            if (data.hasdocument) {
              temp.document = "/uploads/" + req.files[1].orignalname;
            }
          } else if (data.hasdocument) {
            temp.document = "/uploads/" + req.files[0].originalname;
          }

          switch (data.action) {
            case "createmenu":
              temp.type = "menu";
              temp.name = data.name;
              temp.text = data.text;
              menu.splice(parseInt(data.number), 0, temp);
              break;
            case "editmenu":
              temp.type = "menu";
              temp.name = data.name;
              temp.text = data.text;
              menu[parseInt(data.number)] = temp;
              break;
            case "editpagetodropdown":
              temp.name = data.name;
              temp.text = data.text;
              menu[parseInt(data.index)].items[parseInt(data.number)] = temp;
              break;
            case "addpagetodropdown":
              temp.name = data.name;
              temp.text = data.text;
              menu[parseInt(data.index)].items.splice(
                parseInt(data.number),
                0,
                temp
              );
              break;
            default:
              break;
          }
          console.log(menu);

          return collection.modify('key="menu"').set("menu", menu).execute();
        })
        .then(() => {
          session.close();
          res.status(200).json({ success: true });
          res.end();
        });
    });
};

export default savemenu;
