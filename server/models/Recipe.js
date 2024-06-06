const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  recipeText: String,
  revisedPromptDescription: String,
  revisedPromptURL: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
})

module.exports = mongoose.model('Recipe', RecipeSchema)
