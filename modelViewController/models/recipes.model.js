const fs = require("fs");
const { excludeIngredients } = require("../../utils");

const dbPath = "./data/data.json";

// Working async version of first endpoint
const selectRecipesAsync = ({ exclude_ingredients }, cb) => {
  fs.readFile(dbPath, { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    else {
      const recipes = JSON.parse(data);
      cb(
        null,
        exclude_ingredients
          ? excludeIngredients(recipes, exclude_ingredients)
          : recipes
      );
    }
  });
};

const retrieveAllRecipes = () => {
  try {
    return JSON.parse(fs.readFileSync(dbPath, { encoding: "utf8" }));
  } catch (err) {
    throw err;
  }
};

// Synchronous version of first endpoint - I decided to stick with this method
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
    const recipes = retrieveAllRecipes(); // With more time, I would check the format of newRecipe to see...
    const id = { id: `recipe-${recipes.length}` }; // ... if it had the correct fields, and error handle accordingly
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
  selectRecipesAsync,
  selectRecipeById,
  addNewRecipe,
  retrieveAllRecipes,
};
