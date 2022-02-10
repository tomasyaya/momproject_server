const mongoose = require ("mongoose")
const Schema = mongoose.Schema
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    chef: {type: Schema.Types.ObjectId, ref: 'User'

    }

  }
);
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;