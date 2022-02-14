const supertest = require("supertest");
const { retrieveAllRecipes } = require("../modelViewController/models/recipes.model");
const server = require("../server");

const request = supertest(server);

describe("/api", () => {
  test("200: Expect 200 response from server", async () => {
    const { body } = await request.get("/api").expect(200);
    expect(body.message).toBe("ok");
  });
});

describe("GET /api/recipes", () => {
  test("200: Expect 200 response from server", async () => {
    await request.get("/api/recipes").expect(200);
  });
  test("200: Returns list of recipes", async () => {
    const { body } = await request.get("/api/recipes").expect(200);
    const { recipes } = body;
    expect(recipes[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Object),
      })
    );
  });
  test("200: Returns list of recipes excluding 1 ingredient", async () => {
    const { body } = await request.get(
      "/api/recipes?exclude_ingredients=strawberries"
    );
    const { recipes } = body;
    expect(recipes[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Object),
      })
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "cinnamon", grams: 195 },
            { name: "banana", grams: 113 },
            { name: "strawberries", grams: 105 },
            { name: "cocoa nibs", grams: 18 },
            { name: "grapes", grams: 31 },
          ],
        }),
      ])
    );
  });
  test("200: Returns a list of recipes excluding 2 ingredients", async () => {
    const { body } = await request.get(
      "/api/recipes?exclude_ingredients=strawberries,raisins"
    );
    const { recipes } = body;
    expect(recipes[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Object),
      })
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "cinnamon", grams: 195 },
            { name: "banana", grams: 113 },
            { name: "strawberries", grams: 105 },
            { name: "cocoa nibs", grams: 18 },
            { name: "grapes", grams: 31 },
          ],
        }),
      ])
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "apricots", grams: 119 },
            { name: "raisins", grams: 11 },
            { name: "lemon juice", grams: 22 },
            { name: "kale", grams: 144 },
          ],
        }),
      ])
    );
  });
  test("200: Returns a list of recipes excluding 3 ingredients", async () => {
    const { body } = await request.get(
      "/api/recipes?exclude_ingredients=strawberries,raisins,blueberries"
    );
    const { recipes } = body;
    expect(recipes[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        imageUrl: expect.any(String),
        instructions: expect.any(String),
        ingredients: expect.any(Object),
      })
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "cinnamon", grams: 195 },
            { name: "banana", grams: 113 },
            { name: "strawberries", grams: 105 },
            { name: "cocoa nibs", grams: 18 },
            { name: "grapes", grams: 31 },
          ],
        }),
      ])
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "apricots", grams: 119 },
            { name: "raisins", grams: 11 },
            { name: "lemon juice", grams: 22 },
            { name: "kale", grams: 144 },
          ],
        }),
      ])
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "blueberries", grams: 114 },
            { name: "coffee", grams: 20 },
            { name: "kale", grams: 48 },
          ],
        }),
      ])
    );
  });
  test("200: Returns a list of recipes excluding 2 two-word ingredients eg. oat milk", async () => {
    const { body } = await request.get(
      "/api/recipes?exclude_ingredients=lemon_juice,double_cream"
    );
    const { recipes } = body;
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "double cream", grams: 144 },
            { name: "sugar", grams: 153 },
          ],
        }),
      ])
    );
    expect(recipes).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredients: [
            { name: "apricots", grams: 119 },
            { name: "raisins", grams: 11 },
            { name: "lemon juice", grams: 22 },
            { name: "kale", grams: 144 },
          ],
        }),
      ])
    );
  });
});

describe("GET /api/recipes/:id", () => {
  test("200: Expect 200 response from server", async () => {
    await request.get("/api/recipes/recipe-65").expect(200);
  });
  test("200: Returns correct recipe by ID", async () => {
    const { body: { recipe } } = await request.get("/api/recipes/recipe-65").expect(200); // prettier-ignore
    expect(recipe).toEqual(
      expect.objectContaining({
        id: "recipe-65",
        imageUrl: "http://www.images.com/5",
        instructions: "spin it, twist it, pull it, flick it... bop it!",
        ingredients: [
          { name: "double cream", grams: 144 },
          { name: "sugar", grams: 153 },
        ],
      })
    );
  });
  test("404: Recipe does not exist", async () => {
    const { text } = await request.get("/api/recipes/recipe-9999").expect(404);
    expect(text).toBe("Error 404: Recipe not found");
  });
});

describe("POST /api/recipes", () => {
  test("201: Posted new recipe", async () => {
    const {
      body: { newId },
    } = await request
      .post("/api/recipes")
      .expect(201)
      .send({
        imageUrl: "http://www.images.com/5",
        instructions: "tasteless drink for boring men 💪💯",
        ingredients: [
          { name: "huel tasteless edition", grams: 168 },
          { name: "raw egg", grams: 153 },
          { name: "protein powder", grams: 20 },
        ],
      });
      const newestRecipe = retrieveAllRecipes().pop();
      expect(newId.id).toEqual(newestRecipe.id);
  });

  // With more time, test for post being in wrong format here expecting error 400 "Recipe in wrong format"
  // also test to prove id number goes up with each new post

});
