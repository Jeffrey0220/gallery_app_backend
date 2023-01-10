var express = require("express");
var fs = require("fs");

var router = express.Router();

var data = require("../data/data.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  usersData = [];
  len = data.users.length;

  data.users.map((user) => {
    fs.readFile(user.picturePath, function (err, data) {
      if (err) throw err;
      newpicturePath = Buffer.from(data).toString("base64");
      const updateData = { ...user, picturePath: newpicturePath };

      usersData.push(updateData);
      console.log(usersData.length);
      console.log(len);
      if (usersData.length === len) {
        res.send(usersData);
      }
    });
  });
});

module.exports = router;
