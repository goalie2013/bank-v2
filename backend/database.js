const mongoose = require("mongoose");
const colors = require("colors");

class Database {
  //   constructor(config) {
  //     this.config = config;
  //   }

  static async connect() {
    throw new Error("Must implement connect method");
  }

  static async disconnect() {
    throw new Error("Must implement disconnect method");
  }
}

class MongoDB extends Database {
  static async connect() {
    try {
      console.log("connect MongoDB");
      const conn = await mongoose.connect(process.env.MONGO_ATLAS, {
        useUnifiedTopology: true,
      });

      console.log(
        `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
      );
    } catch (err) {
      console.error("connect MongoDB Error", colors.red(err.message));
      throw new Error("Error connecting to Database");
    }

    mongoose.connection.on("error", (err) => {
      console.error("mongoose connection Error", err.message);
      //TODO:Handle Error (Tell user? Try to Reconnect? Throw Error?)
    });
  }

  static async disconnect() {
    //TODO:
    console.log("disconnect");
  }
}

module.exports = MongoDB;
