const csv = require("csvtojson");

exports.uploadFile = (req, res, streamPositions) => {
  let csvStr = req.file.buffer.toString("utf8");
  csv()
    .fromString(csvStr)
    .then((jsonArr) => {
      streamPositions(jsonArr);
    });
  res.redirect(301, "http://localhost:3000");
};
