import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "home",
  collection1: "menu",
  collection2: "homepage_metadata",
};

const initiate = () => {
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
        const schema = session.getSchema(config.schema);
        schema
          .existsInDatabase()
          .then((exists) => {
            if (exists) {
              return schema;
            }
            return session.createSchema(config.schema);
          })
          .then((schema) => {
            return schema
              .createCollection(config.collection, {
                reuseExisting: true,
              })
              .then((collection) => {
                return collection
                  .add({ key: "home", page: data })
                  .execute()
                  .then((result) => {
                    return schema
                      .createCollection(config.collection2, {
                        reuseExisting: true,
                      })
                      .then((collection1) => {
                        return collection1
                          .add({ key: "home", metadata })
                          .execute();
                      });
                  });
              });
          });
      });
  } catch (err) {
    console.log("initiatize db" + err);
  }
};

const data = {
  slider: [],
  introduction: {},
  services: [],
  countries_we_serve: [],
  job_categories: [],
  our_team: [],
  clients: [],
};

const metadata = {
  slider: true,
  introduction: true,
  services: true,
  available_jobs: true,
  countries_we_serve: true,
  job_categories: true,
  our_team: true,
  clients: true,
};

const menuinitiate = () => {
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
          return schema.createCollection(config.collection1, {
            reuseExisting: true,
          });
        })
        .then((collection) => {
          return collection.add({ key: "menu", menu: [] }).execute();
        });
    });
};

export { initiate };
