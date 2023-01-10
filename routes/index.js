var express = require("express");
var fs = require("fs");
var router = express.Router();
var data = require("../data/data.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello");
});

router.get("/api", function (req, res, next) {
  videosData = [];
  len = data.videos.length;

  data.videos.map((video) => {
    fs.readFile(video.videoPath, function (err, data) {
      if (err) throw err;
      newvideoPath = Buffer.from(data).toString("base64");
      const updateData = { ...video, videoPath: newvideoPath };

      videosData.push(updateData);
      console.log(videosData.length);
      console.log(len);
      if (videosData.length === len) {
        res.send(videosData);
      }
    });
  });
});

module.exports = router;
