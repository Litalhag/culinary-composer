const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Recipe = require("../models/Recipe");

// @desc      Get all tutors
// @route     GET /api/v1/tutors
// @access    Public
exports.GetUserRecipes = asyncHandler(async (req, res, next) => {
  // Check for published tutor
  const publishedTutor = await Tutor.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one tutor
  if (!publishedTutor) {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a tutor`,
        400
      )
    );
  }

  res.status(200).json({ success: true, data: publishedTutor });
});

// @desc      Get single Recipe recipe
// @route     GET /api/v1/Tutors/:id
// @access    Public
exports.GetUserRecipe = asyncHandler(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(
      new ErrorResponse(`Recipe not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: recipe });
});

// @desc      Create new recipe
// @route     POST /api/v1/tutors
// @access    Private
exports.CreateByCriteria = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  const recipe = await Recipe.create(req.body);

  res.status(201).json({
    success: true,
    data: recipe,
  });
});
