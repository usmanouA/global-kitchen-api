const express = require('express');
const recipeController = require('../controllers/recipe.controller');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.patch('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
