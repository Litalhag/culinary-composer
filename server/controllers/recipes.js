const path = require('path')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Recipe = require('../models/Recipe')
const { OpenAI } = require('openai')

// @desc      Get all tutors
// @route     GET /api/v1/tutors
// @access    Public
exports.GetUserRecipes = asyncHandler(async (req, res, next) => {
  // Check for published tutor
  const publishedTutor = await Tutor.findOne({ user: req.user.id })

  // If the user is not an admin, they can only add one tutor
  if (!publishedTutor) {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a tutor`,
        400
      )
    )
  }

  res.status(200).json({ success: true, data: publishedTutor })
})

// @desc      Get single Recipe recipe
// @route     GET /api/v1/Tutors/:id
// @access    Public
exports.GetUserRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id)

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({ success: true, data: recipe })
})

// @desc      Create new recipe
// @route     POST /api/v1/tutors
// @access    Private
// @desc      Create new recipe
// @route     POST /api/v1/tutors
// @access    Private
exports.CreateByText = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id

  const { ingredients, devices, numberOfPeople } = req.body

  // Default value for numberOfPeople is set to 1 if it is falsy (undefined, null, 0, etc.)
  const promptNumberOfPeople = numberOfPeople !== undefined ? numberOfPeople : 1

  const prompt = `Given these ingredients: ${ingredients.join(
    ', '
  )} and available kitchen devices: ${devices.join(
    ', '
  )}, create a detailed recipe with cooking instructions for ${promptNumberOfPeople} ${
    promptNumberOfPeople > 1 ? 'people' : 'person'
  }.`

  const configuration = {
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_API_KEY,
  }
  const openai = new OpenAI(configuration)

  console.log(prompt)

  try {
    const recipeResponse = await openai.completions.create({
      // gpt-3.5-turbo-instruct
      model: 'gpt-3.5-turbo-instruct',
      // model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 1,
      // stop: ":",
      presence_penalty: 2,
      // seed: 42,
      // n: 2,
    })

    // Extract the recipe text from the response
    console.log('recipeResponse completions data: ', recipeResponse)
    console.log('====================')

    const recipeText = recipeResponse.choices[0].text.trim()
    if (!recipeText) {
      throw new Error('recipe text error')
    }
    console.log('recipeText: ', recipeText)
    console.log('====================')

    const promptToImage = `A photo of a dish made with ${ingredients.join(
      ', '
    )} as described: ${recipeText}`
    console.log('promptToImage', promptToImage)

    const imageData = await openai.images.generate({
      model: 'dall-e-3',
      prompt: promptToImage,
      size: '1024x1024',
      n: 1,
      quality: 'standard',
    })
    console.log('imageData: ', recipeResponse)
    console.log('====================')

    if (!imageData.data[0]) {
      throw new Error('revised prompt error')
    }

    const revisedPromptDescription = imageData.data[0].revised_prompt
    const revisedPromptURL = imageData.data[0].url
    const recipe = await Recipe.create({
      recipeText,
      revisedPromptDescription,
      revisedPromptURL,
    })
    res.status(200).json({
      success: true,
      data: recipe,
    })
  } catch (error) {
    console.error('Error generating recipe:', error)
    res.status(500).send('Error generating recipe')
  }
})
