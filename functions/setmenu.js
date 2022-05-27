import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "menu",
};

const savemenu = (data, metadata, req, res) => {
  getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      return session.getSchema(config.schema);
    })
    .then((schema) => {
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
          console.log("metadata-received");
          if (metadata.type == "link") {
            if (data[parseInt(metadata.number)].hasimage) {
              data[parseInt(metadata.number)].img =
                "/uploads/" + req.files[0].originalname;
              if (data[parseInt(metadata.number)].hasdocument) {
                data[parseInt(metadata.number)].file =
                  "/uploads/" + req.files[1].originalname;
              }
            } else {
              if (data[parseInt(metadata.number)].hasdocument) {
                data[parseInt(metadata.number)].file =
                  "/uploads/" + req.files[0].originalname;
              }
            }
          } else {
            if (metadata.action == "createdropdown") {
            } else {
              if (
                data[parseInt(metadata.index)].items[parseInt(metadata.number)]
                  .hasimage
              ) {
                data[parseInt(metadata.index)].items[
                  parseInt(metadata.number)
                ].img = "/uploads/" + req.files[0].originalname;
                if (
                  data[parseInt(metadata.index)].items[
                    parseInt(metadata.number)
                  ].hasdocument
                ) {
                  data[parseInt(metadata.index)].items[
                    parseInt(metadata.number)
                  ].file = "/uploads/" + req.files[1].originalname;
                }
              } else {
                if (
                  data[parseInt(metadata.index)].items[
                    parseInt(metadata.number)
                  ].hasdocument
                ) {
                  data[parseInt(metadata.number)].items[
                    parseInt(metadata.number)
                  ].file = "/uploads/" + req.files[0].originalname;
                }
              }
            }
          }

          return collection.modify('key="menu"').set("menu", data).execute();
        })
        .then(() => {
          res.status(200).json({ success: true }).end();
        });
    });
};

export default savemenu;
