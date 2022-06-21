const { Router } = require("express");
const routes = Router()

let products = [];

routes.get("/", (req, res) => {
    try {
      res.render('addProduct')
    } catch (error) {
      res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
    }
});

routes.post("/", (req, res) => {
    try {
      const { title, price, thumbnail } = req.body;
      let id;

      if (title !== '' && price !== '' && thumbnail !== '') {        
        (products.length == 0) ? (id = 1) : (id = products[products.length - 1].id + 1);
      
        products.push({ id, title, price, thumbnail });
  
        res.redirect('/products')
      } else {
        console.log('Complete all camps')
      }
    } catch (error) {
      res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
    }  
});

routes.get("/products", (req, res) => {
  try {
    let hasAny
    if (products.length >0) {
      hasAny = true
    } else {
      hasAny = false
    }
    res.render('listProducts', {products, hasAny})
  } catch (error) {
    res
    .status(error.statusCode ? error.statusCode : 500)
    .json({ error: error.message });
  }
});

module.exports = routes