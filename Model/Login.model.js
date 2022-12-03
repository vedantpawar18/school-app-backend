const mongoose = require("mongoose");

const LoginModel = mongoose.model("Auth",mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true },
    role: { type: String, require: true },
  })
);

module.exports = LoginModel
