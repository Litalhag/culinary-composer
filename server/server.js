const express = require('express');
const { OpenAI } = require('openai');
const axios = require('axios');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
app.use(express.json());


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure to set your API_KEY in environment variables
});


// Endpoint to generate a recipe
app.post('/generate-recipe', async (req, res) => {
  const { ingredients, devices } = req.body;
  // Construct the prompt
  const prompt = `Given these ingredients: ${ingredients.join(', ')} and available kitchen devices: ${devices.join(', ')}, create a detailed recipe with cooking instructions.`;

  try {
    // Call OpenAI's API to generate the recipe text
    const recipeResponse = await openai.createCompletion({
      model: "text-davinci-003", // or the latest available model
      prompt: prompt,
      max_tokens: 500
    });

    // Extract the recipe text from the response
    const recipeText = recipeResponse.data.choices[0].text.trim();

    // Call DALL-E to generate an image for the recipe
    const imageData = await openai.createImage({
      prompt: `A photo of a dish made with ${ingredients.join(', ')} as described: ${recipeText}`,
      n: 1,
      size: "regular", // You can choose "small", "regular", or "large"
    });

    // Extract the image URL from the response
    const imageUrl = imageData.data.data[0].url;

    // Send the recipe text and image URL in the response
    res.json({ recipe: recipeText, imageUrl: imageUrl });
  } catch (error) {
    console.error('Error generating recipe:', error);
    res.status(500).send('Error generating recipe');
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});