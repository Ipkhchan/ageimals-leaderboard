const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    displayName: String!
    wins: Int
    losses: Int
    winStreak: Int
    lossStreak: Int
  }

  type Query {
    mostWins(numUsers: Int): [User],
    mostLosses(numUsers: Int): [String],
    highestWinStreaks(numUsers: Int): [String],
    highestLoseStreaks(numUsers: Int): [String]
  }

  type Mutation {
    winners(userHandles: [String]!): Boolean
  }
`);

module.exports = schema;
