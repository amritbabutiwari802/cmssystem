import getSession from "./session";

const config = {
  schema: "codedcms20x1",
  collection: "globalValues",
};

const addGlobal = (data) => {
  try {
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
              .modify('key="global_data"')
              .set("value", data)
              .execute();
          })
          .then(() => {
            return { success: true };
          });
      });
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export default addGlobal;
