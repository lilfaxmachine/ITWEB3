const mongoose = require("mongoose");
require("dotenv").config();

//***************DB CONNECT*******************//
const connect = () => {
  mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    keepAliveInitialDelay: 300000,
    keepAlive: 1,
  });
};

const disconnect = () => {
  mongoose.disconnect();
};

module.exports = { connect, disconnect };
