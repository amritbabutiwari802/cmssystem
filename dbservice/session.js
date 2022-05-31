import mysqlx from "@mysql/xdevapi";

const config = {
  password: "root",
  user: "root",
  host: "localhost",
  port: 33060,
  tls: true,
};

export default async function getSession() {
  console.log("dbpoint");
  var session;
  try {
    session = await mysqlx.getSession(config);
  } catch (err) {
    return { success: false, err };
  }
  return { success: true, session };
}
