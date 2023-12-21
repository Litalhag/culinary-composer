import path from "path";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Recipe from "../models/Recipe.js";
import { OpenAI } from "openai";
import getOpenAiInstance from "../openAI/utils/openai.js";
// import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";
import { config } from "dotenv-flow";
config({ path: "./", silent: true });
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "../../uploads/" });
//Load env vars (due to configuration in a separate file (e.g., config.env), we should specify the path when calling dotenv.config():
// dotenv.config({ path: "config/config.env" });

// Connect to database
// connectDB();

// @desc    Get all Recipes
// @route   GET /api/v1/Recipes
// @route   GET /api/v1/users/:userId/Recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const Recipes = await Recipe.find({ user: req.params.userId });

    // getting Recipes for a specific user (not using advanced results)
    // via User's reverse populate with virtuals,
    // And via the {mergeParams: true} RecipesRouter property
    return res.status(200).json({
      success: true,
      count: Recipes.length,
      data: Recipes,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single recipe
// @route   GET /api/v1/Recipes/:id
// @access  Public
const getRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await recipe.findById(req.params.id).populate({
    path: "user",
    select: "name description",
  });

  if (!recipe) {
    return next(
      // if it is formatted object id but not in db
      new ErrorResponse(`No recipe found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: recipe });
});

// @desc      Create new recipe
// @route     POST /api/v1/tutors
// @access    Private
const recipeByText = asyncHandler(async (req, res) => {
   // Use the authenticated user's ID
   const userId = req.user.id;
  const { ingredients, devices, numberOfPeople } = req.body;

  // Default value for numberOfPeople is set to 1 if it is falsy (undefined, null, 0, etc.)
  const promptNumberOfPeople = numberOfPeople !== undefined ? numberOfPeople : 1;
  
  const prompt = `Given these ingredients: ${ingredients.join(', ')} and available kitchen devices: ${devices.join(', ')}, create a detailed recipe with cooking instructions for ${promptNumberOfPeople} ${promptNumberOfPeople > 1 ? 'people' : 'person'}.`;
  

  const configuration = {
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(configuration);

  console.log(prompt);

  try {
    const recipeResponse = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 500,
      temperature: 1,
      presence_penalty: 2,
    });

    // Extract the recipe text from the response
    const recipeText = recipeResponse.choices[0].text.trim();
    if (!recipeText) {
      throw new Error("recipe text error");
    }

    const promptToImage = `A photo of a dish made with ${ingredients.join(
      ", "
    )} as described: ${recipeText}`;
    console.log("promptToImage", promptToImage);

    const imageData = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptToImage,
      size: "1024x1024",
      n: 1,
      quality: "standard",
    });

    if (!imageData.data[0]) {
      throw new Error("revised prompt error");
    }

    const revisedPromptDescription = imageData.data[0].revised_prompt;
    const revisedPromptURL = imageData.data[0].url;
    const recipe = await Recipe.create({
      recipeText,
      revisedPromptDescription,
      revisedPromptURL,
    });
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).send("Error generating recipe");
  }
});

// const recipe = await Recipe.create(req.body);
const recipeByImage = (upload.single("image"), asyncHandler(async (req, res) => {
   try {
      const userQuestion = req.body.question || "What's in this image?";
      let dataUrl;
      if (!req.body.imageUrl) {
        const imagePath = req.file.path;
        const imageBuffer = await fs.readFile(imagePath);
        const base64Image = imageBuffer.toString("base64");
        dataUrl = `data:image/jpeg;base64,${base64Image}`;
      }
  
      // STEP 1: Analyze the image
      const openai = getOpenAiInstance();
      const analysisResponse = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: userQuestion },
              {
                type: "image_url",
                image_url: { url: req.body.imageUrl || dataUrl },
              },
            ],
          },
        ],
      });
  
      // Extract description from the analysis response
      const imageDescription = analysisResponse.choices[0].message.content;
  
      // Ensure we have a valid description before prompting for a recipe
      if (!imageDescription) {
        return res.status(400).json({ error: "Invalid image description." });
      }
  
      // Log the description for development purposes
      console.log("Image Description:", imageDescription);
  
      // STEP 2: Prompt for a recipe based on the image description
      const recipePrompt = `Given this description: ${imageDescription}, provide detailed instructions on how to make the dish.`;
  
      const recipeResponse = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 200,
        messages: [
          {
            role: "user",
            content: [{ type: "text", text: recipePrompt }],
          },
        ],
      });
  
      // Send the image description and recipe content to the client
      res.json({
        imageDescription: imageDescription,
        recipe: recipeResponse.choices[0].message.content,
      });
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }))

// @desc    Delete recipe
// @route   DELETE /api/v1/recipes/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`No recipe with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is recipe owner
  // if (recipe.user.toString() !== req.user.id || req.user.role === "publisher") {
  if (recipe.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorize to delete recipe ${recipe._id}`
      ),
      404
    );
  }

  await recipe.deleteOne();
  res.status(201).json({ success: true, data: {} });
});

export { recipeByText, recipeByImage, getRecipes, getRecipe, deleteRecipe };
