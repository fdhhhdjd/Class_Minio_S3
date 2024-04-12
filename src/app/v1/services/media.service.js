//* IMPORT
const awsBucket = require("../dbs/init.minio");
const { S3_BUCKET, MAX_AGE } = require("../constants");
const crypto = require("crypto");

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

  async putObjectS3(req) {
    try {
      const buffer = req?.file?.buffer;
      const mime = req?.file?.mimetype;
      const ContentType = { ContentType: mime };

      const originalFileName = req.file.originalname;
      const hash = crypto
        .createHash("md5")
        .update(originalFileName)
        .digest("hex");
      const key = hash + "_" + originalFileName;

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: buffer,
        ...ContentType,
      };

      const data = await awsBucket.putObject(params).promise();
      console.info(`upload success ${JSON.stringify(data)}`);
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async RemoveS3(req) {
    const paramsDelete = {
      Bucket: S3_BUCKET,
      Key: req?.query?.key,
    };
    const bucketPath = new Promise((resolve, reject) => {
      awsBucket.deleteObject(paramsDelete, (errs, data) => {
        if (errs) {
          console.error("error aws delete", errs);
          reject(errs);
        }

        resolve(data);
      });
    });
    return bucketPath;
  }

  async listObjects() {
    const params = {
      Bucket: S3_BUCKET,
    };

    try {
      const data = await awsBucket.listObjects(params).promise();
      console.log("Objects in bucket:", data.Contents);
      return data.Contents;
    } catch (error) {
      console.error("Error listing objects:", error);
      throw error;
    }
  }

  async getObjectS3(key) {
    const expirationTimeInSeconds = 10 * 60;

    try {
      const data = await awsBucket
        .getObject({
          Bucket: S3_BUCKET,
          Key: key,
        })
        .promise();

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
        Expires: expirationTimeInSeconds,
        ResponseCacheControl: `max-age=${MAX_AGE}`,
        VersionId: data.VersionId,
      };

      const url = awsBucket.getSignedUrl("getObject", params);
      const path = url.replace(/^.*?\/\/[^\/]+/, "");
      return {
        url: process.env.LINK_IMAGE + path,
        type: data.ContentType,
        versionId: data.VersionId,
      };
    } catch (error) {
      console.error("Error downloading file:", error);
      throw error;
    }
  }
}

module.exports = new MediaService();
