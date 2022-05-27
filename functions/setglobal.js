import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "global",
};

const setglobal = (data, req, res) => {
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
          console.log(data);
          if (data.hasimage) {
            data.img = "/uploads/" + req.files[0].originalname;
          }

          return collection
            .modify('key="global"')
            .set("global", data)
            .execute();
        })
        .then(() => {
          res.status(200).json({ success: true }).end();
        });
    });
};

export default setglobal;
