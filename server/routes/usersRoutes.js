// usersRoutes.js

import express from "express";
import { getUser, getUsers } from "../controllers/usersController.js";

const router = express.Router();

// Import dynamically when needed
const recipesRoutes = () => import("./recipesRoutes.js").then((module) => module.default);

// Get recipes for a specific user
router.use("/:userId/recipes", async (req, res, next) => {
  const routes = await recipesRoutes();
  routes(req, res, next);
});

router.route("/").get(getUsers);

router.route("/:id").get(getUser);

export default router;
