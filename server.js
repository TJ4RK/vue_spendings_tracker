const express = require('express');
const serveStatic = require('serve-static');
const router = require("./api.js")
const cors = require("cors")

let port = 3000
let hostname = 'localhost';

app = express();
app.use(serveStatic(__dirname + "/dist"));
app.use("/api", router)
app.use(cors())


app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});