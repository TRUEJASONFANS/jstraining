const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer();

server.get("*", (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>{{url}}</div>`
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
    }
    console.log(html);
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta chartset="UTF-8"/>
        <title>Hello</title>
      </head>
      <body>${html} 123 </body>
    </html>
  `);
  });
});

server.listen(8000)
