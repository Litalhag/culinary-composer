import dotenv from "dotenv";

import express from "express";
import { OpenAI } from "openai";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import bodyParser from "body-parser";
import { config } from "dotenv-flow";
config({ path: "./", silent: true });
import getOpenAiInstance from "./openAI/utils/openai.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "../../uploads/" });

dotenv.config({ path: "config/config.env" });

// Endpoint to generate a recipe
app.post("/generate-recipe", async (req, res) => {
  const { ingredients, devices, numberOfPeople } = req.body;

  // Default value for numberOfPeople is set to 1 if it is falsy (undefined, null, 0, etc.)
  const promptNumberOfPeople =
    numberOfPeople !== undefined ? numberOfPeople : 1;

  const prompt = `Given these ingredients: ${ingredients.join(
    ", "
  )} and available kitchen devices: ${devices.join(
    ", "
  )}, create a detailed recipe with cooking instructions for ${promptNumberOfPeople} ${
    promptNumberOfPeople > 1 ? "people" : "person"
  }.`;

  const configuration = {
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
  };
  const openai = new OpenAI(configuration);

  console.log(prompt);

  try {
    const recipeResponse = await openai.completions.create({
      // gpt-3.5-turbo-instruct
       model: "gpt-3.5-turbo-instruct",
      // model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 1,
      // stop: ":",
      presence_penalty: 2,
      // seed: 42,
      // n: 2,
    });

    // Extract the recipe text from the response
    console.log("recipeResponse completions data: ", recipeResponse);
    console.log("====================");

    const recipeText = recipeResponse.choices[0].text.trim();
    if (!recipeText) {
      throw new Error("recipe text error")
    }
    console.log("recipeText: ", recipeText);
    console.log("====================");

    const promptToImage = `A photo of a dish made with ${ingredients.join(
      ", "
    )} as described: ${recipeText}`;
    console.log("promptToImage", promptToImage);

    const imageData = await openai.images.generate({
      model: "dall-e-3",
      prompt: promptToImage,
      size: "1024x1024",
      n: 1,
      quality: "standard"
    });
    console.log("imageData: ", recipeResponse);
    console.log("====================");

    if (!imageData.data[0]) {
      throw new Error("revised prompt error")
    }
  
    const revisedPromptDescription =  imageData.data[0].revised_prompt    
    const revisedPromptURL =  imageData.data[0].url    

      res.status(200).json({
        success: true,
        data: {recipeText, revisedPromptDescription, revisedPromptURL}
      });    
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).send("Error generating recipe");
  }
});

app.post("/analyze-image", upload.single("image"), async (req, res) => {
  try {
    const userQuestion = req.body.question || "What’s in this image?";
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
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
