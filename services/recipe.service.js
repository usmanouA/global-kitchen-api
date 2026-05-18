const Recipe = require('../models/recipe.model');

const getAllRecipes = async (category) => {
  const filterCondition = category ? { category } : {};
  const recipes = await Recipe.find(filterCondition).sort({ createdAt: -1 });
  return recipes;
};

const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  return recipe;
};

const createRecipe = async (recipeData) => {
  const newRecipe = new Recipe(recipeData);
  await newRecipe.validate();
  const savedRecipe = await newRecipe.save();
  return savedRecipe;
};

const updateRecipe = async (recipeId, recipeData) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    recipeData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedRecipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  return updatedRecipe;
};

const deleteRecipe = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
  if (!deletedRecipe) {
    const error = new Error('Recipe not found');
    error.statusCode = 404;
    throw error;
  }
  return deletedRecipe;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
