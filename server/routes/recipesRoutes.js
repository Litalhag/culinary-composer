import express from 'express';
import {
  getRecipes,
  getRecipe,
  recipeByText,
  recipeByImage,
  deleteRecipe,
} from '../controllers/recipesController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example of using protect middleware for authentication
router.route('/').get(protect, getRecipes);

// Example of using authorize middleware for role-based access control
router.route('/:id').get(protect, authorize('admin', 'user'), getRecipe);

// Other routes with authentication and authorization
router.route('/').post(protect, recipeByText);
router.route('/image').post(protect, recipeByImage);
router.route('/:id').delete(protect, authorize('admin'), deleteRecipe);

export default router;
