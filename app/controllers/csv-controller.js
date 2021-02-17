const csv = require("csvtojson");

exports.uploadFile = (req, res, streamPositions) => {
  let csvStr = req.file.buffer.toString("utf8");
  csv()
    .fromString(csvStr)
    .then((jsonArr) => {
      streamPositions(jsonArr);
    });
  res.send("Redirect to the map...");
};
