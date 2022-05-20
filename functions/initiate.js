import getSession from "../dbservice/session";

const initiate = () => {
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
          return collection.add({ key: "home", page: data }).execute();
        });
    });
};

const data = {
  slider: [],
  introduction: {},
  services: [],
  available_jobs: [],
  countries_we_serve: [],
  job_categories: [],
  our_team: [],
  clients: [],
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
