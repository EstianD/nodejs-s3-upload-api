const AWS = require("aws-sdk");
const config = require("../utils/config");
const uploadRouter = require("express").Router();

// Create AWS S3 instance
const s3 = new AWS.S3({
  accessKeyId: config.AWS_ID,
  secretAccessKey: config.AWS_SECRET,
});

// UPLOAD FILES FUNCTION
async function uploadFile(key, fileData, bucket) {
  // Upload file to Bucket/key(folder)/filename
  // Configure upload config
  const params = {
    Bucket: bucket,
    Key: key,
    Body: fileData,
  };

  try {
    // Upload file
    await s3.upload(params).promise();
  } catch (err) {
    console.log(err);
  }
}

// Upload profile route
// @route POST api/file-upload
// @desc Post profile
// @access Public
uploadRouter.post("/", async (req, res) => {
  // Get file send to API (image)
  const file = req.files.image;
  const bucket = "face-watch-profiles";

  if (file === null) {
    return res.status(400).json({
      msg: "No file received",
    });
  }

  let filename = file.name;
  let filedata = file.data;

  // Pop file extension
  let fileExt = filename.split(".").pop();
  // Build file
  let key = `${filename}.${fileExt}`;

  try {
    // Call upload function
    await uploadFile(key, filedata, bucket);
  } catch (err) {
    // Return error
    res.json({
      msg: err,
    });
  }
});

module.exports = uploadRouter;
