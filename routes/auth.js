const router = require("express").Router();

const { signup, login, logout, isLoggedIn } = require("../controllers/auth");

const { isAnon, noAnon } = require("../middlewares/auth");

router
  .post("/login", login)
  .post("/signup", isAnon, signup)
  .post("/logout", noAnon, logout)
  .get("/login", isLoggedIn);

module.exports = router;
