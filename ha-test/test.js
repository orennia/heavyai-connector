const { DbCon } = require("../dist/node-connector.js")

const getConnection = (db, host, protocol, port, user, pass) => new Promise((resolve, reject) => {
  new DbCon()
      .protocol(protocol)
    .host(host)
    .port(port)
    .dbName(db)
    .user(user)
    .password(pass)
    .connectHA()
    .then((con) => resolve(con))
    .catch((x) => reject(x));
});

(async () => {
  require('dotenv').config({
    'path': __dirname + '/.env'
  });

  const query = "select * from biogas_project limit 1";
  const conn = await getConnection([process.env.HEAVYAI_DB, process.env.HEAVYAI_DB],
    [process.env.HEAVYAI_HOST_A, process.env.HEAVYAI_HOST_B],
    [process.env.HEAVYAI_PROTOCOL, process.env.HEAVYAI_PROTOCOL],
    [process.env.HEAVYAI_PORT,process.env.HEAVYAI_PORT],
    [process.env.HEAVYAI_USER,process.env.HEAVYAI_USER],
    [process.env.HEAVYAI_PASS, process.env.HEAVYAI_PASS]
  );
  const results = await conn.queryAsync(query, {});
  console.log(results[0]['biogas_project_id']);
})();
