const {
  selectRecipes,
  selectRecipeById,
  addNewRecipe,
  selectRecipesAsync
} = require("../models/recipes.model");

// Working async version of first endpoint
const getRecipesAsync = (req, res, next) => {
  selectRecipesAsync(req.query, (err, recipes) => {
    if (err) next(err);
    else res.status(200).send({ recipes });
  });
};

// Synchronous version of first endpoint - I decided to stick with this method 
const getRecipes = async (req, res, next) => {
  try {
    const recipes = await selectRecipes(req.query);
    res.status(200).send({ recipes });
  } catch (err) {
    next(err);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await selectRecipeById(req.params);
    if (recipe) res.status(200).send({ recipe });
    else res.status(404).send("Error 404: Recipe not found");
  } catch (err) {
    next(err);
  }
};

const postNewRecipe = async (req, res, next) => {
  try {
    const newId = await addNewRecipe(req.body);
    res.status(201).send({ newId });
  } catch (err) {
    next(err);
  }
};

module.exports = { getRecipes, getRecipeById, postNewRecipe, getRecipesAsync };
