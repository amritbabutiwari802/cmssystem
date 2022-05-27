import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "home",
  collection1: "menu",
};

const createcategory = (req, res) => {
  console.log("job category");
  return getSession()
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
      return schema
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
            .bind("value", "home")

            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              try {
                const new_body = JSON.parse(JSON.stringify(req.body));
                //   console.log({ result });
                var page = result.page;

                page.job_categories.splice(0, 0, {
                  category: req.body.name,
                  img: "/uploads/" + req.files[0].originalname,
                  counrties: [],
                });

                return collection
                  .modify('key="home"')
                  .set("page", page)
                  .execute();
              } catch (err) {
                console.log(err);
              }
            })
            .then(() => {
              res.status(200).json({ success: true });
              res.end();
            });
        });
    });
};

export default createcategory;
