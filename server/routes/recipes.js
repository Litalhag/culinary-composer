const express = require('express')

const {
  GetUserRecipes,
  GetUserRecipe,
  CreateByText,
} = require('../controllers/recipes')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.route('/create').post(protect, CreateByText)

// router
//   .route("/upload")
//   .post(protect, authorize("publisher", "admin"), CreateByImage);

router.route('/').get(protect, GetUserRecipes)

router.route('/:id').get(protect, GetUserRecipe)

module.exports = router
