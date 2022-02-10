const router = require("express").Router();


const {
  allRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipes");

router

  .get("/", allRecipes)
  .post("/new", createRecipe)
  .post(":id/edit", updateRecipe)
  .post(":id/delete", deleteRecipe)

module.exports = router;