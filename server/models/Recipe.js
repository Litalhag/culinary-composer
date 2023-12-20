const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    Answer: {
      type: String,
    },
  },
  
);

module.exports = mongoose.model('Recipe', RecipeSchema);