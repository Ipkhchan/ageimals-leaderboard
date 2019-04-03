const Koa = require("koa");
const graphqlHTTP = require("koa-graphql");
const mount = require("koa-mount");
const schema = require("./graphql/schema.js");
const root = require("./graphql/root.js");

const app = new Koa();

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true
    })
  )
);

app.listen(3000);
