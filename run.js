require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server-express");
const logger = require("./src/config/logger");
const { getArticleGraphQL } = require("./src/modules/articles/service");
async function run() {
  const PORT = process.env.PORT || 3000;

  const serverGraphQL = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
        test: String
        show: String
        Auth(test: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello world!",
        test: () => "ini test yah",
        Auth: async (_, __, contextValue) => {
          const result = await getArticleGraphQL(contextValue.token);
          return JSON.stringify(result);
        },
      },
    },
    rootValue: {
      auth(args, context) {
        return context.auth;
      },
    },
    context: async ({ req }) => ({
      token: req.headers.authorization,
      contextValue: req,
      // dataSources: {
      //   userApi: new UserAPI(),
      // },
    }),
  });
  await serverGraphQL.start();
  const app = await require("./index");

  await serverGraphQL.applyMiddleware({ app });

  app.use("/**", (req, res) => {
    res.status(404).send({
      status: false,
      message: "not found",
    });
  });

  app.listen(PORT, () => logger.info(`you are listened localhost:${PORT}`));
}

run();
