const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const graphqlHTTP = require("koa-graphql");
const mount = require("koa-mount");

const schema = require("./graphql/schema.js");
const root = require("./graphql/root.js");
const handleRequests = require("./middleware/handle-requests.js");

const app = new Koa();

app.use(bodyParser());

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

app.use(handleRequests);

app.listen(3000);
