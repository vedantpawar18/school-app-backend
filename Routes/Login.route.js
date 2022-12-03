const { Router } = require("express");
const LoginModel = require("../Model/Login.model.js");

const userauthentification = Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

userauthentification.post("/signup", async (req, res) => {
  const { email, password, age, name, gender, role } = req.body;

  const Alreadyuser = await LoginModel.find({ email });
  console.log("Alredy user", Alreadyuser);
  if (Alreadyuser.length > 0) {
    return res.send("ALready User Exists");
  }

  bcrypt.hash(password, 8, function (err, hash) {
    if (err) {
      return res.status(401).send("Please try again later");
    } else {
      const NewUser = new LoginModel({
        email,
        password,
        age,
        name,
        gender,
        role,
      });
      NewUser.save();
      res.status(200).send({ messege: "Signup Succesfull", NewUser });
    }
  });
});

userauthentification.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const Finduser = await LoginModel.findOne({ email });
  console.log("Userfind the login", Finduser);
  if (Finduser) {
    let hash = Finduser.password;
    let userid = Finduser._id;
    let name=Finduser.name
    let role=Finduser.role

    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        return res.status(404).send("Invalid Credentials");
      } else {
        var token = jwt.sign({ email, userid }, process.env.JWT_SECRET);

        return res
          .status(200)
          .send({ messege: "Login Succesfull", Finduser, token, name,role });
      }
    });
  } else {
    return res.status(404).send("Invalid Credentials");
  }
});

module.exports = userauthentification;
