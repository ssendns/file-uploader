const express = require("express");
const router = express.Router({ mergeParams: true });
const filesController = require("../controllers/filesController");

router.get("/", filesController.getAllFiles);
router.get("/upload", filesController.uploadFileGet);
router.post(
  "/upload",
  filesController.upload.single("file"),
  filesController.uploadFilePost
);
router.post("/:id/delete", filesController.deleteFile);

module.exports = router;
