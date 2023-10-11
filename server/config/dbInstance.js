const { default: mongoose } = require("mongoose");

const dbUrl =
  process.env.MONGO_URI;

function dbConnection() {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Mongodb connection error:"));
  db.once("open", () => {
    console.info("connected to db");
  });
}

module.exports = dbConnection;
