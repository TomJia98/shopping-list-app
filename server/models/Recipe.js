const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  recipeName: { type: String, required: true },
  items: { type: Array },
  colour: {
    type: String,
    required: true,
  },
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
