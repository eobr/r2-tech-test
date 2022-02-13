
const excludeIngredients = (recipes, exclude) => {
  const excludeArr = exclude.split(",").map((x) => x.replace(/_/g, " "));
  return recipes.filter((recipe) => {
    for (const ingredient of recipe.ingredients) {
      if (excludeArr.includes(ingredient.name)) return false;
    }
    return true;
  });
};

module.exports = { excludeIngredients };


// Method 2 

// const excludeIngredients = (recipes, exclude_ingredients) => {
//   const badIngredients = exclude_ingredients.split(",").map((x) => x.replace(/_/g, " "));;
//   const filteredRecipes = [];
//   recipeLoop: for (const recipe of recipes) {
//     for (const ingredient of recipe.ingredients) {
//       if (badIngredients.includes(ingredient.name)) continue recipeLoop;
//     }
//     filteredRecipes.push(recipe);
//   }
//   return filteredRecipes;
// };