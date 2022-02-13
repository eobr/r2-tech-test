const fs = require("fs");
const { excludeIngredients } = require("../../utils");

const dbPath = "./data/data.json";

const retrieveAllRecipes = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, { encoding: "utf8" }));
  } catch (err) {
    throw err;
  }
};

const selectRecipes = ({ exclude_ingredients }) => {
  try {
    const recipes = retrieveAllRecipes();
    if (!exclude_ingredients) return recipes;
    return excludeIngredients(recipes, exclude_ingredients);
  } catch (err) {
    throw err;
  }
};

const selectRecipeById = ({ id }) => {
  try {
    const recipes = retrieveAllRecipes();
    return recipes.filter((recipe) => recipe.id === id)[0];
  } catch (err) {
    throw err;
  }
};

const addNewRecipe = (newRecipe) => {
  try {
    // with more time, I would check the format of newRecipe to see...
    // ... if it had the correct fields, and error handle accordingly
    const recipes = retrieveAllRecipes();
    const id = { id: `recipe-${recipes.length}` };
    const recipeWithId = { ...id, ...newRecipe };
    recipes.push(recipeWithId);
    fs.writeFileSync("./data/data.json", JSON.stringify(recipes), {
      encoding: "utf8",
    });
    return id;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  selectRecipes,
  selectRecipeById,
  addNewRecipe,
  retrieveAllRecipes,
};
