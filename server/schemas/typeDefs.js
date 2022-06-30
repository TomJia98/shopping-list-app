const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    password: String!
    recipes: [Recipes]
    list: [shoppingList]
  }

  type Recipe {
    _id: ID
    recipeName: String!
    items: [String]
    colour: String!
  }

  type shoppingList {
    _id: ID
    listName: String!
    recipes: [Recipe]
    singleItem: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createList(listName: String!): shoppingList
    updateList(_id: ID!, listName: String, recipes: [Recipe], singleItem: [String]) : shoppingList
    createRecipe(recipeName: String!, colour: String!, items: [String]) : Recipe
    updateRecipe(_id: ID!, recipeName: String!, colour: String!, items: [String]: Recipe

  }
`;

module.exports = typeDefs;
