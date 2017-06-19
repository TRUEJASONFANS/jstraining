
const static = require('koa-static');

const path = require('path')

const Koa = require("koa");

const bodyParser = require("koa-bodyparser");

const controller = require("./controller");

const templating = require("./templating");

const rest = require("./rest");

var cors = require("koa-cors");

const app = new Koa();


//允许跨域访问
app.use(cors());

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// static file support:
let staticFiles = require("./static-files");
app.use(staticFiles("/static/", __dirname + "/static"));


// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(
  templating("views", {
    noCache: true,
    watch: true
  })
);

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

app.listen(3000);
console.log("app started at port 3000...");
