const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    mostWins: String
    mostLosses: String
  }
`);

module.exports = schema;
