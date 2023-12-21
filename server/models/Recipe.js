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
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    }
  },
  
);

export default mongoose.model('Recipe', RecipeSchema);