import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "home",
  collection1: "menu",
};

export default async function upoadservice(metadata, files, data, res) {
  console.log(metadata.type);
  switch (metadata.type) {
    case "introduction":
      handleintro(metadata, files, data);
      break;
    case "section":
      console.log("handle section");
      handleSection(metadata, files, data);
      break;
    case "menubar":
      handleMenubar(metadata, files, data);
      break;
    case "dropdown":
      break;
    case "update":
      return await getSession()
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
              return schema.createCollection(config.collection, {
                reuseExisting: true,
              });
            })
            .then((collection) => {
              return collection
                .modify('key="home"')
                .set("page", data)
                .execute();
            })
            .then(() => {
              console.log("ended");
              session.close();

              res.status(200).json({ success: true });
              res.end();
            });
        });
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
              var page = result.page;
              if (data.hasmainimage) {
                page.introduction.image = "/uploads/" + files[0].originalname;
              }
              page.introduction.shortdescription = data.shortdescription;
              page.introduction.detaildescription = data.detaildescription;

              return collection
                .modify('key="home"')
                .set("page", page)
                .execute();
            })
            .then(() => {
              session.close();
            });
        });
    });
};

const handleSection = (metadata, files, data) => {
  console.log("in section");
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
          return collection
            .find("key", ":value")
            .bind("value", "home")

            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              const lpage = JSON.parse(JSON.stringify(result));
              const page = lpage.page;
              console.log(page);
              if ((metadata.action = "create")) {
                switch (parseInt(metadata.index)) {
                  case 1:
                    page.slider.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });

                    break;
                  case 3:
                    page.services.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });

                    break;
                  case 4:
                    page.available_jobs.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });

                    break;
                  case 5:
                    page.countries_we_serve.splice(
                      parseInt(data.innerindex),
                      0,
                      {
                        img: "/uploads/" + files[0].originalname,
                        shortdescription: data.shortdescription,
                        detaildescription: data.detaildescription,
                      }
                    );

                    break;
                  case 6:
                    page.job_categories.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });

                    break;
                  case 7:
                    page.our_team.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });
                    6;
                    break;
                  case 8:
                    page.clients.splice(parseInt(data.innerindex), 0, {
                      img: "/uploads/" + files[0].originalname,
                      shortdescription: data.shortdescription,
                      detaildescription: data.detaildescription,
                    });

                    break;
                  default:
                    break;
                }
              } else if (metadata.action == "update") {
                switch (parseInt(metadata.index)) {
                  case 1:
                    page.slider[parseInt(data.innerindex)].img =
                      "/uploads/" + files[0].originalname;
                    page.slider[parseInt(data.innerIndex)].shortdescription =
                      data.shortdescription;
                    page.slider[parseInt(data.innerIndex)].detaildescription =
                      data.detaildescription;

                    break;
                  case 3:
                    page.services[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;
                    page.services[parseInt(data.innerIndex)].shortdescription =
                      data.shortdescription;
                    page.services[parseInt(data.innerIndex)].detaildescription =
                      data.detaildescription;

                    break;
                  case 4:
                    page.available_jobs[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;
                    page.available_jobs[
                      parseInt(data.innerIndex)
                    ].shortdescription = data.shortdescription;
                    page.available_jobs[
                      parseInt(data.innerIndex)
                    ].detaildescription = data.detaildescription;

                    break;
                  case 5:
                    page.countries_we_serve[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;
                    page.countries_we_serve[
                      parseInt(data.innerIndex)
                    ].shortdescription = data.shortdescription;
                    page.countries_we_serve[
                      parseInt(data.innerIndex)
                    ].detaildescription = data.detaildescription;

                    break;
                  case 6:
                    page.job_categories[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;

                    page.job_categories[
                      parseInt(data.innerIndex)
                    ].shortdescription = data.shortdescription;
                    page.job_categories[
                      parseInt(data.innerIndex)
                    ].detaildescription = data.detaildescription;

                    break;
                  case 7:
                    page.our_team[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;
                    page.our_team[parseInt(data.innerIndex)].shortdescription =
                      data.shortdescription;
                    page.our_team[parseInt(data.innerIndex)].detaildescription =
                      data.detaildescription;
                    break;
                  case 8:
                    page.clients[parseInt(data.innerIndex)].img =
                      "/uploads/" + files[0].originalname;
                    page.clients[parseInt(data.innerIndex)].shortdescription =
                      data.shortdescription;
                    page.clients[parseInt(data.innerIndex)].detaildescription =
                      data.detaildescription;
                    break;
                  default:
                    break;
                }
              } else if (metadata.action == "delete") {
                switch (parseInt(metadata.index)) {
                  case 1:
                    page.slider.splice(parseInt(metadata.innerindex), 1);
                    break;
                  case 3:
                    page.services.splice(parseInt(metadata.innerindex), 1);
                    break;
                  case 4:
                    page.available_jobs.splice(
                      parseInt(metadata.innerindex),
                      1
                    );
                    break;
                  case 5:
                    page.countries_we_serve.splice(
                      parseInt(metadata.innerindex),
                      1
                    );
                    break;
                  case 6:
                    page.job_categories.splice(
                      parseInt(metadata.innerindex),
                      1
                    );
                    break;
                  case 7:
                    page.our_team.splice(parseInt(metadata.innerindex), 1);

                    break;
                  case 8:
                    page.clients.splice(parseInt(metadata.innerindex), 1);

                    break;
                  default:
                    break;
                }
              }

              return collection
                .modify('key="home"')
                .set("page", page)
                .execute()
                .then(() => {
                  session.close();
                });
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
                case "update":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                    if (metadata.haslogo) {
                      temp.logo = "/uploads/" + files[1].originalname;
                      if (metadata.hasdocument) {
                        temp.document = "/uploads/" + files[2].originalname;
                      }
                    } else if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[0].originalname;
                    if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.hasdocument) {
                    temp.document = "/uploads/" + files[0].originalname;
                  }
                  temp.name = data.name;
                  temp.caption = data.caption;
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  menu[parseInt(data.index)] = temp;

                  break;
                case "create":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                    if (metadata.haslogo) {
                      temp.logo = "/uploads/" + files[1].originalname;
                      if (metadata.hasdocument) {
                        temp.document = "/uploads/" + files[2].originalname;
                      }
                    } else if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[0].originalname;
                    if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.hasdocument) {
                    temp.document = "/uploads/" + files[0].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu.splice(parseInt(data.index), 0, temp);
                  break;
                case "delete":
                  menu.splice(parseInt(data.index), 1);
                  break;
                // case "createdropdown":
                //   temp.name = data.name;
                //   temp.type = "dropdown";
                //   temp.items = [];
                //   menu.splice(parseInt(data.position), 0, temp);
                //   break;

                // case "createdropdownpage":
                //   if (metadata.hasMainimage) {
                //     temp.mainImage = "/uploads/" + files[0].originalname;
                //   }
                //   if (metadata.haslogo) {
                //     temp.logo = "/uploads/" + files[1].originalname;
                //   }
                //   temp.shortdescription = data.shortdescription;
                //   temp.detaildescription = data.detaildescription;
                //   temp.name = data.name;
                //   temp.type = "link";
                //   menu[parseInt(data.innerIndex)].splice(parseInt(data.position), 0, temp);
                //   break;
                // case "updatedropdownpage":
                //   if (metadata.hasMainimage) {
                //     temp.mainImage = "/uploads/" + files[0].originalname;
                //   }
                //   if (metadata.haslogo) {
                //     temp.logo = "/uploads/" + files[1].originalname;
                //   }
                //   temp.shortdescription = data.shortdescription;
                //   temp.detaildescription = data.detaildescription;
                //   temp.name = data.name;
                //   temp.type = "link";
                //   menu[parseInt(data.innerIndex)][parseInt(data.innerIndex)] = temp;
                //   break;
                // case "deletedropdownpage":
                //   menu[parseInt(data.innerIndex)].splice(parseInt(data.innerindex), 1);
                //   break;
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

function handleDropdown(metadata, files, data) {
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
                case "createdropdown":
                  temp.name = data.name;
                  temp.type = "dropdown";
                  temp.items = [];
                  menu.splice(parseInt(data.position), 0, temp);
                  break;

                case "createitem":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                    if (metadata.haslogo) {
                      temp.logo = "/uploads/" + files[1].originalname;
                      if (metadata.hasdocument) {
                        temp.document = "/uploads/" + files[2].originalname;
                      }
                    } else if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[0].originalname;
                    if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.hasdocument) {
                    temp.document = "/uploads/" + files[0].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu[parseInt(data.innerIndex)].splice(
                    parseInt(data.position),
                    0,
                    temp
                  );
                  break;
                case "updateitem":
                  if (metadata.hasMainimage) {
                    temp.mainImage = "/uploads/" + files[0].originalname;
                    if (metadata.haslogo) {
                      temp.logo = "/uploads/" + files[1].originalname;
                      if (metadata.hasdocument) {
                        temp.document = "/uploads/" + files[2].originalname;
                      }
                    } else if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.haslogo) {
                    temp.logo = "/uploads/" + files[0].originalname;
                    if (metadata.hasdocument) {
                      temp.document = "/uploads/" + files[1].originalname;
                    }
                  } else if (metadata.hasdocument) {
                    temp.document = "/uploads/" + files[0].originalname;
                  }
                  temp.shortdescription = data.shortdescription;
                  temp.detaildescription = data.detaildescription;
                  temp.name = data.name;
                  temp.type = "link";
                  menu[parseInt(data.innerIndex)][parseInt(data.innerindex)] =
                    temp;
                  break;
                case "deleteitem":
                  menu[parseInt(data.innerindex)].splice(
                    parseInt(data.innerindex),
                    1
                  );
                  break;
                case "delete":
                  menu.splice(parseInt(data.index), 1);
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
