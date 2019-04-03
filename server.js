const schema = require('./graphqlSchema');

const Koa = require("koa");
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const app = new Koa();

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})));

app.listen(3000);
console.log('Running a GraphQL API server at localhost:3000/graphql');