const { Router } = require("express");

const route = Router();

let products = [];

route.get("/products", (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res
    .status(error.statusCode ? error.statusCode : 500)
    .json({ error: error.message });
  }
});

route.get("/products/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
  
    if (products.find((prod) => prod.id === id)) {
      const product = products.find((prod) => prod.id === id);
      res.json(product);
    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
    
  } catch (error) {
    res
    .status(error.statusCode ? error.statusCode : 500)
    .json({ error: error.message });
  }
});

route.post("/products", (req, res) => {
  try {
    const { title, price, thumbnail } = req.body;
    let id;
  
    if (products.length == 0) {
      id = 1;
    } else {
      id = products[products.length - 1].id + 1;
    }
  
    products.push({ id, title, price, thumbnail });
  
    res.json({ id, title, price, thumbnail });

  } catch (error) {
    res
    .status(error.statusCode ? error.statusCode : 500)
    .json({ error: error.message });
  }

});

route.put("/products/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
  
    if (products.find((prod) => prod.id === id)) {
      const { title, price, thumbnail } = req.body;
  
      products.map((prod) => {
        if (prod.id === id) {
          (prod.title = title),
            (prod.price = price),
            (prod.thumbnail = thumbnail);
        }
      });
  
      res.json(products);

    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }

  } catch (error) {
    res
    .status(error.statusCode ? error.statusCode : 500)
    .json({ error: error.message });
  }
});

route.delete("/products/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (products.find((prod) => prod.id === id)) {
      products = products.filter((prod) => prod.id !== id);

      res.json(products);
    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
  } catch (error) {
    res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
  }
});

module.exports = route;
