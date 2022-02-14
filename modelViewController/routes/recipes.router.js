const recipesRouter = require("express").Router();
const { getRecipes, getRecipesAsync, getRecipeById, postNewRecipe } = require("../controllers/recipes.controller");

recipesRouter.route("/").get(getRecipes);

recipesRouter.route("/:id").get(getRecipeById);

recipesRouter.route("/").post(postNewRecipe);

module.exports = recipesRouter;