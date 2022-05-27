import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "home",
  collection1: "menu",
};

const savejobs = (req, res) => {
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
                console.log(page.job_categories);
                page.job_categories[parseInt(req.body.index)].counrties.splice(
                  0,
                  0,
                  JSON.parse(req.body.data)
                );

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

export default savejobs;
