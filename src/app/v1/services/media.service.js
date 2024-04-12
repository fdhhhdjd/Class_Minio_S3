//* IMPORT
const awsBucket = require("../dbs/init.minio");
const { S3_BUCKET } = require("../constants");

class MediaService {
  async uploadS3(req) {
    const buffer = req?.file?.buffer;
    const mime = req?.file?.mimetype;
    const ContentType = { ContentType: mime };

    const params = {
      Bucket: S3_BUCKET,
      Key: req.file.originalname,
      Body: buffer,
      ...ContentType,
    };
    return new Promise((resolve, reject) => {
      awsBucket.upload(params, async (errs, data) => {
        if (errs) {
          console.error("error aws", errs);
          reject(errs);
        }
        resolve(data);
        console.info(`upload success ${JSON.stringify(data)}`);
      });
    });
  }
  async RemoveS3(data) {
    console.log(data);
    return data;
  }
}

module.exports = new MediaService();
