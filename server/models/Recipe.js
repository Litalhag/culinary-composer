import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema(
  {
    recipeText: {
      type: String,
    },
    revisedPromptDescription:{
      type: String,
    },
    revisedPromptURL:{
      type: String,
    }
  },
  
);

export default mongoose.model('Recipe', RecipeSchema);