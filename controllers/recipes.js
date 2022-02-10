const Recipe = require("../models/recipes");
const mongoose = require("mongoose");

function isObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// display all recipes
async function allRecipes(req, res) {
  try {
    const recipes = await Recipe.find()
    res.status(200).json(recipes).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}


//  creates the task
async function createRecipe(req, res) {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json(recipe).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// updates a task by its id
async function updateRecipe(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) {
      res.status(400).json("Id not valid").end();
    }
    const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true,
    }).lean();

    res.status(200).json(recipe).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

// deletes a task by its id
async function deleteRecipe(req, res) {
  try {
    const { id } = req.params;
    if (!isObjectId(id)) {
      res.status(400).json("Id not valid").end();
    }
    const recipe = await Recipe.findByIdAndDelete(id).lean();
    res.status(200).json(recipe).end();
  } catch (err) {
    res.status(400).json(err.message).end();
  }
}

module.exports = {
    allRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};