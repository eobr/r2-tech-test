const fs = require("fs");
const {
  retrieveAllRecipes,
} = require("./modelViewController/models/recipes.model");



// Function works, but needs refactoring, I'm thinking maybe a reducer or a map for this instead of 3 nested loops
const combineIngredients = async () => {
  const recipes = retrieveAllRecipes();
  for (const recipe of recipes) {
    const ingredientsArr = [];
    for (const ingredient of recipe.ingredients) {
      if (!ingredientsArr.some((e) => e.name === ingredient.name)) {
        ingredientsArr.push(ingredient);
      } else {
        for (item of ingredientsArr) {
          if (item.name === ingredient.name) {
            item.grams += ingredient.grams;
          }
        }
      }
    }
    recipe.ingredients = ingredientsArr;
  }
  fs.writeFileSync("./data/data.json", JSON.stringify(recipes), {
    encoding: "utf8",
  });
};

combineIngredients();
