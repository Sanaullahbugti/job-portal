const jwt = require("jsonwebtoken");
const { StudentModel } = require("../models/Student");
const verifyToken = (req, res, next) => {

  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    const decode = jwt.verify(req.token, "secretkey");
    const id = decode.student._id;
    console.log(bearerToken)
    StudentModel.findOne({
      _id: id,
      "tokens.token": bearerToken
    }).then(data => {
      console.log(data);
      if (!data) {
        new Error();
      } else {
        console.log("i am on next ")
        next();
      }
    });
  } else {
    res.json(403);
  }
};
module.exports = { verifyToken };
