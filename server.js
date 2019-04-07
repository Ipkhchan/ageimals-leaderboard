const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');

const {handleGet, handlePost} = require('./middleware/index.js');
const {cache} = require('./cache.js');

const app = new Koa();
var router = new Router();

dotenv.config();

app.use(bodyParser());

router.post('/ageboard', handleGet);
router.post('/postwinners', handlePost);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
