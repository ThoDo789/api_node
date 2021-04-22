const jsonServer = require("json-server");
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});



// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createAt = Date.now();
    req.body.UpdateAt = Date.now();
  } else if (req.method === "PATCH") {
    req.body.UpdateAt = Date.now();
  }

  // Continue to JSON Server router
  next();
});


router.render = (req, res) => {
  console.log(req)
  //check GET with pagination
  //if yes, custom output
  //Otherwise, keep default behavior
  
  // const queryParams= queryString.parse(req._parsedUrl.query) 
  // console.log(queryParams);
  // const headers = res.getHeaders();
  // const toTalCountHeader = headers["x-total-count"];
  // if (req.method === "GET" && toTalCountHeader) {
  //   const result = {
  //     songs: res.locals.data,
  //     pagination: {
  //       _page:Number.parseInt(queryParams._page)||1,
  //       _limit:Number.parseInt(queryParams._limit)||10,
  //       _totalRows:Number.parseInt(toTalCountHeader)
  //     }
  //   };
  //   return res.jsonp(result);
  // }

  res.jsonp({ body: res.locals.data });
};
// Use default router
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
