const prisma = require("../config/db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const getAllFiles = async (req, res, next) => {
  const folderId = Number(req.params.folderId);
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { files: true },
    });
    res.render("folder", { folder });
  } catch (err) {
    next(err);
  }
};

const uploadFileGet = async (req, res) => {
  const folderId = Number(req.params.folderId);
  res.render("uploadFile", { folderId });
};

const uploadFilePost = async (req, res, next) => {
  try {
    const folderId = Number(req.params.folderId);
    const file = req.file;

    await prisma.file.create({
      data: {
        name: file.originalname,
        url: `/uploads/${file.filename}`,
        size: file.size,
        userId: req.user.id,
        folderId: folderId ? Number(folderId) : null,
      },
    });

    res.redirect("/folders");
  } catch (err) {
    next(err);
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = Number(req.params.id);
    const file = await prisma.file.findUnique({ where: { id: fileId } });

    const filePath = path.join(__dirname, "..", "public", file.url);
    fs.unlinkSync(filePath);

    await prisma.file.delete({ where: { id: fileId } });

    res.redirect("back");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  upload,
  getAllFiles,
  uploadFileGet,
  uploadFilePost,
  deleteFile,
};
