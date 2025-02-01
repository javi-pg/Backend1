import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager ("./src/data/carts.json");

//GET "/:id"
cartRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id); 
    const cart = await cartManager.getCartById(id);

    if (!cart) {
      return res.status(404).send({ message: `Carrito con ID ${id} no encontrado.` });
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//POST "/"
cartRouter.post("/", async (req, res) => {
    try {
      const addedCart = await cartManager.addCart();
      
      res.status(200).send({ message: "Carrito agregado con éxito.", cart: addedCart });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });


//POST "/:cid/product/:pid"
cartRouter.post("/:cartId/product/:productId", async (req, res) => {
  try {
    const cartId = Number(req.params.cartId);
    const productId = Number(req.params.productId);
    const { quantity } = req.body; 

    if (!quantity || quantity <= 0) {
      return res.status(400).send({ message: "La cantidad debe ser mayor a 0." });
    }

    const updatedCart = await cartManager.addProductInCartById(cartId, productId, quantity);
    res.status(200).send({ message: "Producto agregado al carrito.", cart: updatedCart });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


export default cartRouter