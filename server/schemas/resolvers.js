const { AuthenticationError } = require("apollo-server-express");
const { User, shoppingList, Recipe } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("Recipe")
        .populate("shoppingList");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        // .populate("Recipe")
        // .populate("shoppingList");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { _id }, context)=>{

    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    }, //need to change the following routes to change the things in the contxt of the user, not creating new stuff
    //actually, newly created items jsut need to have their id's added to the arrays of the owning schemas
    createRecipe: async (parent, { recipeName, items, colour }, context) => {
      const newRecipe = await Recipe.create({ recipeName, items, colour });
      if (!newRecipe) {
        throw new AuthenticationError("recipe creation failed");
      } else {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addtoset: { recipe: newRecipe._id },
          }
        );
        return newRecipe;
      }
    },

    updateRecipe: async (parent, { _id, recipeName, items, colour }) => {
      const updateRecipe = await Recipe.findOneAndUpdate(
        { _id },
        { recipeName, items, colour },
        { new: true }
      );
      //remember to send the updated recipe with the old details if they havnt been changed
      if (!updateRecipe) {
        throw new AuthenticationError("recipe update failed");
      } else return updateRecipe;
    },

    createList: async (parent, { listName }, context) => {
      const createList = await shoppingList.create(listName);
      if (!createList) {
        throw new AuthenticationError("list creation failed");
      } else {
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addtoset: { recipe: createList._id },
          }
        );
        return createList;
      }
    },

    updateList: async (parent, { _id, listName, recipe, singleItem }) => {
      const updateList = await shoppingList.findOneAndUpdate(
        { _id },
        { listName, recipe, singleItem },
        { new: true }
      );
      if (!updateList) {
        throw new AuthenticationError("list update failed");
      } else return updateList;
    },
  },
};

module.exports = resolvers;
