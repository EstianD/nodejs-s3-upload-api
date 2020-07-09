require("dotenv").config();

let PORT = process.env.PORT;
let AWS_ID = process.env.AWS_ID;
let AWS_SECRET = process.env.AWS_SECRET;

module.exports = {
  PORT,
  AWS_ID,
  AWS_SECRET,
};
