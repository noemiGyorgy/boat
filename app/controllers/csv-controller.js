const csv = require("csvtojson");

exports.uploadFile = (req, res, streamPosition) => {
  let csvStr = req.file.buffer.toString("utf8");
  csv()
    .fromString(csvStr)
    .then((jsonArr) => {
      streamPosition(jsonArr);
    });
};
