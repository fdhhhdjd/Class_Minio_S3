//* IMPORT
const { SuccessResponse } = require("../../../cores/success.response");
const mediaService = require("../services/media.service");

class MediaController {
  async listObjects(_, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.listObjects(),
    }).send(res);
  }

  async getFile(req, res, ___) {
    const key = req?.query?.key;
    new SuccessResponse({
      metadata: await mediaService.getObjectS3(key),
    }).send(res);
  }
  async upload(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.uploadS3(req),
    }).send(res);
  }
  async putObject(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.putObjectS3(req),
    }).send(res);
  }
  async putObjectMultiple(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.putObjectS3Multiple(req.files),
    }).send(res);
  }
  async remove(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.RemoveS3(req),
    }).send(res);
  }
}

module.exports = new MediaController();
