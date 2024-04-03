const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
    hello() {
      return "Hello world!"
    },
  }

module.exports={
    schema,root
}
// const { gql } require('apollo-server-express');

// export const typeDefs = gql`

//     type Article{
//         id:ID
//         title:String
//         slug:String
//         description:String
//     }

//     input ArticleInput{
//         id: ID
//         title: String
//         slug: String
//         description: String
//     }

//     type Query{
//         getAllArticle:[Article]
//         findAArticle(id:ID):Article
//     }

//     type Mutation{
//     }

// `;