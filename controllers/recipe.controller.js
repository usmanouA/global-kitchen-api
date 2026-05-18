const recipeService = require('../services/recipe.service');

const getAllRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = req.body;
    const newRecipe = await recipeService.createRecipe(recipeData);
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeData = req.body;
    const updatedRecipe = await recipeService.updateRecipe(id, recipeData);
    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await recipeService.deleteRecipe(id);
    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: deletedRecipe,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
