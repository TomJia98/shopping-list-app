const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const listSchema = new Schema({
  listName: { type: String, required: true },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  singleItem: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const shoppingList = model("shoppingList", listSchema);

module.exports = shoppingList;
