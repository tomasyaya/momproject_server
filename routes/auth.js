const router = require("express").Router();

const controllers = require("../controllers/auth");

router
  .post("/logout", controllers.logout)
  .post("/login", controllers.login)
  .post("/signup", controllers.signup)
  .get("/login", controllers.isLoggedIn);

module.exports = router;
