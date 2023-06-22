const express = require("express");
const ProductManager = require("./src/ProductManager_express.js");
const app = express();

const productmanager = new ProductManager("./src/Productos.json");

app.get("/products", async (req, res) => {
  try {
    const products = await productmanager.readProducts();
    const { limit } = req.query;
    if (limit != undefined) {
      return res.json(products.slice(0, limit));
    } else {
      return res.json(products);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = await productmanager.getProductsById(pid);
    return res.json(productId);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("El servidor está corriendo en el puerto 8080");
});
