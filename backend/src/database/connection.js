import mysql from "mysql";
import util from "util";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "AVA2022//4*",
  database: "users",
});
pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database Connection was closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
  }

  if (connection) {
    connection.release();
    console.log("DB is connected");
    return;
  }
});
util.promisify(pool.query);

export default pool;
