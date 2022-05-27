import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "media",
};

const imageinitiate = async (res) => {
  await getSession()
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
          return collection
            .add({ key: "media", media: { image: [], video: [] } })
            .execute()
            .then((result) => {
              if (result.error) {
                res.status(500);
                res.end();
              } else {
                res.status(200).json({ success: true });
                res.end();
              }
            });
        })
        .then(() => {});
    });
};

export default imageinitiate;

const setmedia = async (req, res) => {
  await getSession()
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
          return collection
            .find("key", ":value")
            .bind("value", "media")

            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              console.log(result);
              var media = result.media;
              if (req.body.metadata == "update") {
                media = JSON.parse(req.body.data);
              } else if (req.body.metadata == "upload_image") {
                media.image.splice(
                  0,
                  0,
                  "/uploads/" + req.files[0].originalname
                );
              } else if (req.body.metadata == "upload_video") {
                media.video.splice(
                  0,
                  0,
                  "/uploads/" + req.files[0].originalname
                );
              }

              return collection
                .modify('key="media"')
                .set("media", media)
                .execute()
                .then((response) => {
                  if (response.error) {
                    console.log(response.err);
                  } else {
                    res.status(200).json({ success: true });
                    res.end();
                  }
                });
            });
        });
    });
};

const getmedia = (req, res) => {
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
          return collection
            .find("key", ":value")
            .bind("value", "media")

            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              if (result.error) {
                res.status(500);
                res.end();
              } else {
                res.status(200).json(result.media);
                res.end();
              }
              // if (data.hasimage) {
              //   data.img = "/uploads/" + req.files[0].originalname;
              // }

              // return collection
              //   .modify('key="media"')
              //   .set("media", data)
              //   .execute();
            });
        });
    });
};

export { setmedia, getmedia };
