module.exports =
  process.env.mode === "production"
    ? require("./keys_prod.js")
    : require("./keys_dev.js");
