const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Jobs = require("../models/Jobs");
const Company = require("../models/Company");
const Admin = require("../models/Admin");
const app = express();
const { StudentModel } = require("../models/Student");
const bodyParser = require("body-parser");
app.use(bodyParser());
app.use(bodyParser.urlencoded());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/job_portal");
//db connection
const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection error ");
});
db.once("open", () => {
  console.log("connection built ");
});
app.post("/admin/login", (req, res) => {
  Admin.findOne({ name: req.body.name, password: req.body.password })
    .then(admin => {
      if (!admin) {
        return res.json("sorry you entered wrong cridintils");
      }
      // else {
      res.json(admin);
      // }
    })
    .catch(err => {
      res.json(err);
    });
});
//ban company
app.post("/companies/ban", (req, res) => {
  Company.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.id) },
    { $set: { active: false } },
    { new: true }
  )
    .then(update => {
      res.json({ update });
    })
    .catch(err => {
      res.json(err);
    });
});
app.post("/students/ban", (req, res) => {
  StudentModel.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.body.id) },
    { $set: { active: false } }
  )
    .then(update => {
      res.json({ update });
    })
    .catch(err => {
      err.json(err);
    });
});
//get all companies
app.get("/companies/getall", (req, res) => {
  Company.find({ active: true })
    .then(companies => {
      res.json(companies);
    })
    .catch(err => {
      res.json(err);
    });
});
//get all students data
app.get("/students/getall", (req, res) => {
  StudentModel.find({ active: true })
    .then(students => {
      res.json({ students });
    })
    .catch(err => {
      console.log(err);
    });
});
//student login
app.post("/students/login", (req, res) => {
  StudentModel.findOne({
    name: req.body.name,
    password: req.body.password,
    active: true
  })
    .then(student => {
      if (!student) {
        return res.json(403);
      } else {
        res.json(student);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

//student signup
app.post("/students/signup", (req, res) => {
  const { name, password, summery } = req.body;
  const newStudent = new StudentModel({
    name,
    password,
    summery,
    skills: ["Java", "React", "Redux", "React Native"],
    active: 1
  });
  newStudent
    .save()
    .then(success => {
      res.json(200);
    })
    .catch(err => {
      res.json(err);
    });
});

//post job api
app.post("/jobs/postjob", (req, res) => {
  const { title, description, salary, level, postedBy } = req.body;
  var _id = mongoose.Types.ObjectId();
  const newJob = new Jobs({
    _id,
    title,
    description,
    salary,
    level,
    postedBy: postedBy
  });
  newJob
    .save()
    .then(data => {
      return Company.findOne({ _id: mongoose.Types.ObjectId(postedBy) });
    })
    .then(company => {
      if (company != null) {
        company.jobs.push(mongoose.Types.ObjectId(_id));
        company
          .save()
          .then(response => {
            res.json(200);
          })
          .catch(errr => {
            res.json(errr);
          });
      } else {
        console.log("company did not ");
      }
    })
    .catch(err => {
      console.log("err", err);
    });
});
app.get("/jobs/getall", (req, res) => {
  Jobs.find({}, (err, jobs) => {
    res.json({ jobs });
  });
});
// apply for job
app.post("/jobs/apply", (req, res) => {
  const { appliedBy, jobId } = req.body;
  Jobs.findOne({ _id: mongoose.Types.ObjectId(jobId) })
    .then(jobs => {
      if (jobs != null) {
        jobs.appliedBy.push(mongoose.Types.ObjectId(appliedBy));
        return jobs.save();
      } else {
        res.json(403);
      }
    })
    .then(res.json(200))
    .catch(err => {
      res.json(err);
    });
});
//getjob by componyid
app.post("/getjob/id", (req, res) => {
  const { id } = req.body;
  Jobs.find({ postedBy: mongoose.Types.ObjectId(id) })
    .then(jobs => {
      {
        jobs != null ? res.json(jobs) : res.json(403);
      }
    })
    .catch(err => {
      res.json(err);
    });
});
//company signup
app.post("/company/signup", (req, res) => {
  const { name, password, description, size } = req.body;
  const newCompany = new Company({
    name,
    password,
    description,
    size,
    active: true
  });
  newCompany
    .save()
    .then(data => {
      res.json(200);
    })
    .catch(err => {
      res.json(403);
    });
});
//company login
app.post("/company/login", (req, res) => {
  Company.find({
    name: req.body.name,
    password: req.body.password,
    active: true
  })
    .then(company => {
      res.json(company);
    })
    .catch(err => {
      res.json(err);
    });
});

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.json(403);
  }
}
app.listen(4000, () => {
  console.log("server running on port 4000");
});
