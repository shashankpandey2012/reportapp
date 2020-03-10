/* eslint-disable no-path-concat,no-unused-vars,quote-props */
var config = (module.exports = {
  app: {
    port: 4000,
    publicDir: __dirname + "/../public",
    uploadsDir: __dirname + "/../../storage/uploads",
    sessionDir: __dirname + "/../../storage/sessions",
    downloadDir: __dirname + "/../storage/downloads"
  },
  log: {
    warnLogFile: __dirname + "/../logs/warn.log",
    errorLogFile: __dirname + "/../logs/error.log",
    debugLogFile: __dirname + "/../logs/debug.log",
    infoLogFile: __dirname + "/../logs/info.log"
  },
  constants: {
    timeout: 30000,
    production: false
  },
  databases: {
    mongo: {
      mongoSessionUrl: "mongodb://127.0.0.1:27017/reportdb",
      username: "",
      password: ""
    }
  },
  data: {

  }
});
