const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  description: String
})

module.exports = mongoose.model("User", blogSchema);