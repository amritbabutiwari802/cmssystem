const config = {
  schema: "codedcms20x1",
  collection1: "home",
  collection2: "menu",
  collection3: "global",
  collection4: "media",
};
import getSession from "../dbservice/session";

const getall = async (req, res) => {
  const data = await getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      var schema = session.getSchema(config.schema);
      return schema
        .existsInDatabase()
        .then((exists) => {
          if (exists) {
            return schema;
          }
          return session.createSchema(config.schema);
        })
        .then((schema) => {
          return schema
            .createCollection(config.collection1, {
              reuseExisting: true,
            })
            .then((collection1) => {
              return collection1
                .find("key", ":value")
                .bind("value", "home")

                .execute()
                .then((response) => {
                  return response.fetchOne();
                })
                .then((result1) => {
                  return schema
                    .createCollection(config.collection2, {
                      reuseExisting: true,
                    })
                    .then((collection2) => {
                      return collection2
                        .find("key", ":value")
                        .bind("value", "menu")

                        .execute()
                        .then((response) => {
                          return response.fetchOne();
                        })
                        .then((result2) => {
                          return schema
                            .createCollection(config.collection3, {
                              reuseExisting: true,
                            })
                            .then((collection3) => {
                              return collection3
                                .find("key", ":value")
                                .bind("value", "global")

                                .execute()
                                .then((response) => {
                                  return response.fetchOne();
                                })
                                .then((result3) => {
                                  return schema
                                    .createCollection(config.collection4, {
                                      reuseExisting: true,
                                    })
                                    .then((collection4) => {
                                      return collection4
                                        .find("key", ":value")
                                        .bind("value", "media")

                                        .execute()
                                        .then((response) => {
                                          return response.fetchOne();
                                        })
                                        .then((result4) => {
                                          session.close();
                                          res.status(200).json({
                                            home: result1.page,
                                            menu: result2.menu,
                                            global: result3.global,
                                            media: result4.media,
                                          });

                                          res.end();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};

export default getall;
