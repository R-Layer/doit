const path = require("path");
const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const configVars = require("./config/keys");

const port = configVars.PORT;
const server = http.createServer(app);

mongoose.connect(
  configVars.MONGO_URL,
  { useNewUrlParser: true },
  err =>
    err
      ? console.log("Error on opening db", err)
      : console.log("Mongo connected!")
);

server.listen(port, () => console.log(`Server listening on port ${port}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
