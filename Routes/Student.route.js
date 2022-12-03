const { Router } = require("express");
const Authentification = require("../Middlewares/Authentification");
const LoginModel = require("../Model/Login.model");
const StudentModel = require("../Model/Student.model");

const studentController = Router();

// For teacher where he can access all student tests

studentController.get("/user/:id", async (req, res) => {
  const id = req.params.id;

  const FindStudent = await StudentModel.find({ userid: id });

  if (FindStudent.length > 0) {
    return res.send({ messege: "Student Find Succesfull", FindStudent });
  } else {
    return res.send("Data not found");
  }
});

// To get All students data in teacher route

studentController.get("/studentdata/:l/:s", async (req, res) => {
  let {s}=req.params
  let {l}=req.params
    const Allstudent = await LoginModel.find({role:"student"}).limit(l).skip(s)
    // const Total=await LoginModel.find({})
  res.send(Allstudent);
});

// For pagination to get all student count

studentController.get("/totalcount", async (req, res) => {
  const Allcount=await LoginModel.find({})
  res.send(Allcount);
});


// For teacher to delete perticular student test

studentController.delete("/delete/test/:id", async (req, res) => {
  const id = req.params.id;

  const Findtest = await StudentModel.findOneAndDelete({ _id: id });

  res.send({ messege: "Test Deleted Suceesfuly", Findtest });
});

// For teacher to delete perticular student

studentController.delete("/delete/:studentid", async (req, res) => {
  const id = req.params.studentid;

  const Findstudent = await LoginModel.findOneAndDelete({ _id: id });

  res.send({ messege: "Student Deleted Suceesfuly", Findstudent });
});

// For teacher to create perticular tests for student

studentController.post("/create/:id", async (req, res) => {
  const { name, subject, marks, date } = req.body;
  const id = req.params.id;

  // const FindStudent=await LoginModel.findOne({_id:id})
  const NewTestData = new StudentModel({
    name,
    subject,
    marks,
    date,
    userid: id,
  });
  NewTestData.save();

  res.send({ messege: "Data created Succesfully", NewTestData });
});

// for Student to access his/her tests

studentController.get("/", Authentification, async (req, res) => {
  var { userid } = req.body;
  const Data = await StudentModel.find({ userid });
  if (Data.length > 0) {
    res.send(Data);
  } else {
    res.send("Data not found");
  }
});

// For teacher to Search for perticular student name

studentController.get("/searchtitle/:title", async (req, res) => {
  let { title } = req.params;
  console.log("title", title);
  const userData = await LoginModel.find({});
  let val = [];
  for (let i = 0; i < userData.length; i++) {
    let tc = title.toLowerCase();
    if (userData[i].name.toLowerCase() === tc) {
      val.push(userData[i]);
    }
  }
  res.send(val);
});

//For teacher to apply sort on basis of age and filter by gender

studentController.get("/query/:q", async (req, res) => {
  let { q } = req.params
  // console.log("aaa", q.split(","));

  // console.log("all param", q.split(",")[0], q.split(",")[1], q.split(",")[2])


  console.log(q.split(",")[0] == "male" && q.split(",")[1] == "lth")



  if (q.split(",")[0] == "male" && q.split(",")[1] == "lth") {
    const data = await LoginModel.find({ gender: q.split(",") }).sort({ age: -1 })
    res.send(data);

  } else if (q.split(",")[0] == "male" && q.split(",")[1] == "htl") {
    const data = await LoginModel.find({ gender: q.split(",") }).sort({ age: 1 })
    res.send(data);

  } else if (q.split(",")[0] == "female" && q.split(",")[1] == "lth") {
    const data = await LoginModel.find({ gender: q.split(",") }).sort({ age: -1 })
    res.send(data);

  } else if (q.split(",")[0] == "female" && q.split(",")[1] == "htl") {
    const data = await LoginModel.find({ gender: q.split(",") }).sort({ age: 1 })
    res.send(data);

  }


  else if (q.split(",")[0] == "male" || q.split(",")[0] == "female") {
    const data = await LoginModel.find({ gender: q.split(",") });
    res.send(data);
  } else if (q.split(",")[2] == "htl" || q.split(",")[1] == "htl") {
    const notes = await LoginModel.find({}).sort({ age: 1 })
    res.send(notes)
  } else if (q.split(",")[2] == "lth" || q.split(",")[1] == "lth") {
    const notes = await LoginModel.find({}).sort({ age: -1 })
    res.send(notes)
  } else if (q.split(",")[1] == "male" || q.split(",")[1] == "female") {
    const data = await LoginModel.find({ gender: q.split(",") });
    res.send(data);
  }
  else {
    const data = await LoginModel.find({});
    res.send(data);
  }
});


// For Student to update his/her test completion status

studentController.patch("/edittestcompletion/:id", async (req, res) => {
  const id=req.params.id
  const data=req.body.completed
  if(data=="true")
  {
    const Data = await StudentModel.findOneAndUpdate({ _id:id },{$set:{completed:"false"}})
    const updatedData=await StudentModel.find({_id:id})
    res.send({messege:"Updated Suceesfully",updatedData})
  }
  else{
    const Data = await StudentModel.findOneAndUpdate({ _id:id },{$set:{completed:"true"}})
    const updatedData=await StudentModel.find({_id:id})
    res.send({messege:"Updated Suceesfully",updatedData})
  }

});

module.exports = studentController;
