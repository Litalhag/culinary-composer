const express = require("express");

const {
  GetUserRecipes,
  GetUserRecipe,
  CreateByCriteria,
  // CreateByImage,
} = require("../controllers/recipes");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/create")
  .post(protect, authorize("publisher", "admin"), CreateByCriteria);

// router
//   .route("/upload")
//   .post(protect, authorize("publisher", "admin"), CreateByImage);

router.route("/").get(protect, authorize("publisher", "admin"), GetUserRecipes);

router
  .route("/:id")
  .get(protect, authorize("publisher", "admin"), GetUserRecipe);

module.exports = router;
