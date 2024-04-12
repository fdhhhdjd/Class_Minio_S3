//* LIB
const express = require("express");

//* IMPORT
const loginController = require("../../controllers/media.controller");
const { asyncHandler } = require("../../../../commons/helpers/asyncHandler");
const { uploadMemory } = require("../../configs/multer.configs");
const { MAX_MEDIA, MAX_UPLOAD_MULTIPLE } = require("../../constants");

const router = express.Router();

router.post(
  "/upload",
  uploadMemory.single("image", MAX_MEDIA),
  asyncHandler(loginController.upload)
);

router.post(
  "/putObject",
  uploadMemory.single("image", MAX_MEDIA),
  asyncHandler(loginController.putObject)
);

router.post(
  "/upload/multiple",
  uploadMemory.array("image", MAX_UPLOAD_MULTIPLE),
  asyncHandler(loginController.putObjectMultiple)
);

router.delete("/remove", asyncHandler(loginController.remove));

router.get("/listObjects", asyncHandler(loginController.listObjects));
router.get("/getFile", asyncHandler(loginController.getFile));

module.exports = router;
