const csv = require("csvtojson");

exports.uploadFile = (req, res) => {
  let csvStr = req.file.buffer.toString("utf8");
  csv()
    .fromString(csvStr)
    .then((jsonObj) => {
      jsonObj.map((position) => console.log(position));
    });
  res.send("Redirect to the map...");
};
