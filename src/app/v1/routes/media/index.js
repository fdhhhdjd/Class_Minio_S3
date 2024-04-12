//* LIB
const express = require("express");

//* IMPORT
const loginController = require("../../controllers/media.controller");
const { asyncHandler } = require("../../../../commons/helpers/asyncHandler");
const { uploadMemory } = require("../../configs/multer.configs");
const { MAX_MEDIA } = require("../../constants");

const router = express.Router();

router.post(
  "/upload",
  uploadMemory.single("image", MAX_MEDIA),
  asyncHandler(loginController.upload)
);
router.delete("/remove", asyncHandler(loginController.remove));

module.exports = router;
