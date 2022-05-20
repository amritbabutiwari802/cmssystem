import getSession from "./session";

const config = {
  schema: "codedcms20x1",
  collection: "introduction",
};

const updateIntroduction = async (info, operation_mode) => {
  try {
    const result = await getSession()
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
              .bind("value", "keyxid")
              .fields("value")
              .execute()
              .then((response) => {
                return response.fetchOne();
              })
              .then((result) => {
                let temp = result;
                if (operation_mode == "update_logo") {
                  temp.logo = info;
                } else {
                  temp.text = info;
                }
                return collection
                  .modify('key="keyxid"')
                  .set("value", temp)
                  .execute();
              });
          })
          .then(() => {
            return { success: true };
          });
      });
    if (result.success) {
      return result;
    }
    return { return: false };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export default addsms;
