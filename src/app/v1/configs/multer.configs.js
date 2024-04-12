"use strict";

const multer = require("multer");

const uploadMemory = multer({ storage: multer.memoryStorage() });

module.exports = {
  uploadMemory,
};
