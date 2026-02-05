const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  passWord: String,
});

module.exports = mongoose.model("User", userSchema);
