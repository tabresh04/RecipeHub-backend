const express = require('express');
const recipeRouter = express.Router();

const recipe = require("../controllers/recipeController");

recipeRouter.get('/', recipe.getRecipes); // to get all the recipes
recipeRouter.get('/:id', recipe.getRecipe); // to get one recipe

recipeRouter.get('/users/admin', recipe.getUsers);// to get all users

recipeRouter.delete('/users/admin/:userId', recipe.deleteUser); // to delete user

recipeRouter.post('/add-recipe', recipe.addRecipe); // to add a recipe
recipeRouter.put('/edit-recipe/:id', recipe.editRecipe); // to edit the recipe
recipeRouter.delete('/:id', recipe.deleteRecipe); // to delete the recipe
recipeRouter.get('/YourRecipes/:userId', recipe.getYourRecipes); // to get users recipes

recipeRouter.post("/favourite", recipe.addFavourite); // to post favourite

recipeRouter.get("/favourite/:userId", recipe.getFavourites); // to get favourite

recipeRouter.delete("/favourite/:recipeId", recipe.deleteFav); // to delete favourite

recipeRouter.post("/like/:id", recipe.incLike); //to increse likes

module.exports = recipeRouter;
