const router = require("express").Router();


const {
 signup,
 login,
 logout,
 isLoggedIn
} = require("../controllers/auth");

const { isAnon, noAnon } = require("../middlewares/auth");

router

  .post("/signup", isAnon, signup)
  .post("/login", isAnon, login)
  .post("/logout", noAnon, logout)
  .get("/login", isAnon, isLoggedIn)

module.exports = router;