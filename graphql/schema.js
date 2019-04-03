const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type UserError {
    message: String
  }

  type UserErrors {
    userErrors: [UserError]
  }

  type Query {
    mostWins(numUsers: Int): [String],
    mostLosses(numUsers: Int): [String],
    highestWinStreaks(numUsers: Int): [String],
    highestLoseStreaks(numUsers: Int): [String]
  }

  type Mutation {
    winners(users: [String]!): UserErrors
  }
`);

module.exports = schema;
