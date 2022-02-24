const path = require("path")
const express = require("express");
// const sarahRouter = require('./sarahRouter.js');

const app = express();

app.use('/product/:id', express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

//Sarah router functions

app.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products', (req, res) => {
  console.log('get from products!!', res);
});

app.get('/', (req, res) => {
  res.redirect('/product/43230');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
