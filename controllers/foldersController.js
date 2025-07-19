const prisma = require("../config/db");

const getAllFolders = async (req, res, next) => {
  try {
    const id = req.user.id;
    const folders = await prisma.folder.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    res.render("allFolders", { folders });
  } catch (err) {
    next(err);
  }
};

const createFolderGet = (req, res) => {
  res.render("createFolder");
};

const createFolderPost = async (req, res, next) => {
  const { name } = req.body;
  try {
    await prisma.folder.create({
      data: {
        name,
        userId: req.user.id,
      },
    });
    res.redirect("/folders");
  } catch (err) {
    next(err);
  }
};

const deleteFolder = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.folder.delete({ where: { id } });
  res.redirect("/folders");
};

module.exports = {
  getAllFolders,
  createFolderGet,
  createFolderPost,
  deleteFolder,
};
