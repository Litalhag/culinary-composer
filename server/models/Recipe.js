const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeText: String,
    revisedPromptDescription: String,
    revisedPromptURL: String,
  },

);

module.exports = mongoose.model('Recipe', RecipeSchema);