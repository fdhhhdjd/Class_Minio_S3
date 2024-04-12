//* LIB
const express = require("express");

//* IMPORT
const loginController = require("../../controllers/media.controller");
const { asyncHandler } = require("../../../../commons/helpers/asyncHandler");

const router = express.Router();

router.post("/upload", asyncHandler(loginController.upload));
router.delete("/remove", asyncHandler(loginController.remove));

module.exports = router;
