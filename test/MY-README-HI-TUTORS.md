# combineIngredients function: 
Enter "node seed.js" into the terminal
I have written a function that combines duplicate ingredients.
I've only ran it on dataTest.json and it worked, so you can see it working on the real data if you run the command above ^^

# Things I would have done given more time:
- Write a seed function using beforeAll at the start of the test file, I would make a new json called orignialData.json and write originalData's contents to data.json before running each test, just so every time I run the test suite I don't keep posting the same recipe to the real data
- More error handling eg. testing format of the object sent in POST
- Refactoring a few functions which are a bit messy (...looking at you combineIngredients 👀)
- A few more tests, eg. testing id number goes up with each new post (it does but there is no official test for it)
- Research whether the try-catch blocks in the models are necesary, because maybe the error would be caught by the controller anyway?
- Research a bit more into fs.readFileSync and see if I made the right choice over the async version


Overall, I really enjoyed this task, and it was a great reminder of how much I love backend!


