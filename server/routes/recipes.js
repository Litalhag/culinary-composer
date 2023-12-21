import express from "express";

import {
  GetUserRecipes,
  GetUserRecipe,
  CreateByText,
  // CreateByImage,
} from "../controllers/recipes.js";

const router = express.Router();

import { protect, authorize } from "../middleware/auth.js";


router
  .route("/create")
  .post(protect, authorize("publisher", "admin"), CreateByText);

// router
//   .route("/upload")
//   .post(protect, authorize("publisher", "admin"), CreateByImage);

router.route("/").get(protect, authorize("publisher", "admin"), GetUserRecipes);

router
  .route("/:id")
  .get(protect, authorize("publisher", "admin"), GetUserRecipe);

export default router;
