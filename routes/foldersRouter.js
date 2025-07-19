const express = require("express");
const router = express.Router();
const foldersController = require("../controllers/foldersController");

router.get("/", foldersController.getAllFolders);
router.get("/create", foldersController.createFolderGet);
router.post("/create", foldersController.createFolderPost);
router.post("/:id/delete", foldersController.deleteFolder);

module.exports = router;
