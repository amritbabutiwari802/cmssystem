import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "global",
};

const globalinitiate = (res) => {
  getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      var schema = session.getSchema(config.schema);
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
          return collection.add({ key: "global", global: global }).execute();
        })
        .then(() => {
          session.close();
          res.status(200).json({ success: true });
          res.end();
        });
    });
};

export default globalinitiate;

const global = {
  name: "",
  address: "",
  phone: "",
  email: "",
  lic: "",
  registration: "",
  pagetitle: "",
  pagedescription: "",
  facebook: "",
  twitter: "",
  youtube: "",
  instagram: "",
  linkedin: "",
  img: "",
};
