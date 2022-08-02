import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query Users {
    users {
      _id
      username
      recipe {
        _id
        recipeName
        items
        colour
      }
      list {
        _id
        listName
        recipe {
          _id
          recipeName
          items
          colour
        }
        singleItem
      }
    }
  }
`;

export const QUERY_USER = gql`
  query Users($username: String!) {
    user(username: $username) {
      _id
      username
      recipe {
        recipeName
        items
        colour
        _id
      }
      list {
        _id
        listName
        recipe {
          colour
          _id
          recipeName
          items
        }
        singleItem
      }
    }
  }
`;

export const QUERY_ME = gql``;

// export const QUERY_THOUGHTS = gql`
//   query getThoughts {
//     thoughts {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//     }
//   }
// `;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       thoughts {
//         _id
//         thoughtText
//         thoughtAuthor
//         createdAt
//       }
//     }
//   }
// `;
