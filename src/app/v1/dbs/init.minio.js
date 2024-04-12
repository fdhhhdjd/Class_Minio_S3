//* IMPORT
const AWS = require("aws-sdk");

const localSetup = {
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  sslEnabled: process.env.AWSL_SSL,
  s3ForcePathStyle: process.env.AWS_FORCE_STYLE,
};

const awsBucket = new AWS.S3(localSetup);

module.exports = awsBucket;
