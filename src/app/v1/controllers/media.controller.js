//* IMPORT
const { SuccessResponse } = require("../../../cores/success.response");
const mediaService = require("../services/media.service");

class MediaController {
  async upload(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.uploadS3(req),
    }).send(res);
  }
  async remove(req, res, ___) {
    new SuccessResponse({
      metadata: await mediaService.RemoveS3(req),
    }).send(res);
  }
}

module.exports = new MediaController();
