const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    mostWins: String
  }
`);

// const root = {
//   mostWins: () => {
//     return ["Hello"];
//   }
// };

// graphql(schema, "{ mostWins }", root).then(response => {
//   console.log(response);
// });

module.exports = schema;
