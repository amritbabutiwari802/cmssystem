import getSession from "./session";

const config = {
  schema: "codedcms20x1",
  collection: "home",
  collection1: "menu",
};

export default function upoadservice(metadata, files, data) {
  switch (metadata.type) {
    case "introduction":
      handleintro(metadata, files, data);
      break;
    case "section":
      handleSection(metadata, files, data);
      break;
    case "menubar":
      handleMenubar(metadata, files, data);
      break;
    default:
      break;
  }
}

const handleintro = (metadata, files, data) => {
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
            .fields("value")
            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              var page = result.page;
              if (metadata.hasMainimage) {
                page.introduction.image = "/uploads/" + files[0].originalname;
              }
              page.introduction.shortdescription = data.shortdescription;
              page.detaildescription = data.detaildescription;

              return collection
                .modify('key="pages"')
                .set("page", page)
                .execute();
            });
        });
    });
};

const handleSection = (metadata, files, data) => {
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
            .bind("value", "home")
            .fields("page")
            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              var page = result;

              switch (metadata.index) {
                case 0:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.slider.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.slider[data.position].shortdescription =
                          data.shortdescription;
                        page.slider[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.slider.splice(parseInt(metadata, innerindex), 1);
                      break;
                    default:
                      break;
                  }
                  break;
                case 2:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.services.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.services[data.position].shortdescription =
                          data.shortdescription;
                        page.services[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.services.splice(parseInt(metadata, innerindex), 1);
                      break;
                    default:
                      break;
                  }
                  break;
                case 4:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.available_jobs.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.available_jobs[data.position].shortdescription =
                          data.shortdescription;
                        page.available_jobs[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.available_jobs.splice(
                        parseInt(metadata, innerindex),
                        1
                      );
                      break;
                    default:
                      break;
                  }
                  break;
                case 5:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.countries_we_serve.splice(
                          parseInt(data.position),
                          0,
                          {
                            img: "/uploads/" + files[0].originalname(),
                            shortdescription: data.shortdescription,
                            detaildescription: data.detaildescription,
                          }
                        );
                      } else {
                        page.countries_we_serve[
                          data.position
                        ].shortdescription = data.shortdescription;
                        page.countries_we_serve[
                          data.position
                        ].detaildescription = data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.countries_we_serve.splice(
                        parseInt(metadata, innerindex),
                        1
                      );
                      break;
                    default:
                      break;
                  }
                  break;
                case 6:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.job_categories.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.job_categories[data.position].shortdescription =
                          data.shortdescription;
                        page.job_categories[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.job_categories.splice(
                        parseInt(metadata, innerindex),
                        1
                      );
                      break;
                    default:
                      break;
                  }
                  break;
                case 7:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.our_team.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.our_team[data.position].shortdescription =
                          data.shortdescription;
                        page.our_team[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.our_team.splice(parseInt(metadata, innerindex), 1);
                      break;
                    default:
                      break;
                  }
                  break;
                case 8:
                  switch (metadata.action) {
                    case "add":
                      if (metadata.hasMainimage) {
                        page.clients.splice(parseInt(data.position), 0, {
                          img: "/uploads/" + files[0].originalname(),
                          shortdescription: data.shortdescription,
                          detaildescription: data.detaildescription,
                        });
                      } else {
                        page.clients[data.position].shortdescription =
                          data.shortdescription;
                        page.clients[data.position].detaildescription =
                          data.detaildescription;
                      }
                      break;
                    case "delete":
                      page.clients.splice(parseInt(metadata, innerindex), 1);
                      break;
                    default:
                      break;
                  }
                  break;
                default:
                  break;
              }
              return collection
                .modify('key="home"')
                .set("page", page)
                .execute();
            });
        });
    });
};

function handleMenubar(metadata, files, data) {
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
          return collection
            .find("key", ":value")
            .bind("value", "menu")
            .fields("value")
            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              const menu = result;
              const temp = {};
              switch (metadata.action) {
                case "updatelink":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                  }
                  if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[1].originalname;
                  }
                  temp.name = data.name;
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  menu[data.position] = temp;

                  break;
                case "createlink":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                  }
                  if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[1].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu.splice(parseInt(data.position), 0, temp);
                  break;
                case "deletemenu":
                  menu.splice(parseInt(data.position), 1);
                  break;
                case "createdropdown":
                  temp.name = data.name;
                  temp.type = "dropdown";
                  temp.items = [];
                  menu.splice(parseInt(data.position), 0, temp);
                  break;

                case "createdropdownpage":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                  }
                  if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[1].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu[data.position].splice(parseInt(data.position), 0, temp);
                  break;
                case "updatedropdownpage":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                  }
                  if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[1].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu[data.position][data.innerindex] = temp;
                  break;
                case "deletedropdownpage":
                  menu[data.position].splice(parseInt(data.innerindex), 1);
                  break;
                default:
                  break;
              }
              return collection
                .modify('key="menu"')
                .set("value", { menu })
                .execute();
            });
        });
    });
}
