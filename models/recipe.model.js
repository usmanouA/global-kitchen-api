const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Recipe category is required'],
      trim: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Ingredients are required'],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: 'Ingredients must be a non-empty array',
      },
    },
    prepTime: {
      type: Number,
      required: [true, 'Preparation time is required'],
      min: [1, 'Preparation time must be at least 1 minute'],
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

recipeSchema.index({ category: 1 });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
