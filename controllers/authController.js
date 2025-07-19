const bcrypt = require("bcrypt");
const prisma = require("../config/db");

const signUpGet = async (req, res) => {
  res.render("signUp");
};

const signUpPost = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render("signUp", { error: "passwords do not match" });
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.render("signUp", { error: "user already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        password: hash,
        isAdmin: false,
      },
    });
    res.redirect("/log-in");
  } catch (err) {
    return next(err);
  }
};

const logInGet = (req, res) => {
  res.render("logIn");
};

const logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

module.exports = { signUpGet, signUpPost, logInGet, logOutGet };
