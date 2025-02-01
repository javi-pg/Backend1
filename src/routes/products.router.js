import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager ("./src/data/products.json");
//implementar endpoints para utilizar cada uno de los metodos
//GET  en la ruta raiz de "/api/products"
productsRouter.get ("/", async (req,res) => {
    try {
        const data = await productManager.getProducts();
        res.status(200).send(data);
    } catch (error){
       res.status(500).send({ message: error.message });
    }
})

//GET "/;pid"
productsRouter.get("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id); 
      const product = await productManager.getProductsById(id);
  
      if (!product) {
        return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
      }
  
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

//POST "/" 
productsRouter.post("/", async (req, res) => {
    try {
      const newProduct = req.body;
      const addedProduct = await productManager.addProduct(newProduct);
  
      res.status(200).send({ message: "Producto agregado con éxito.", product: addedProduct });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });


//PUT "/:pid"
productsRouter.put ("/:id", async (req,res)=>{
    try {
    const id = Number(req.params.id);
    const updatedProduct = req.body; 
    const result = await productManager.setProductById(id, updatedProduct);

    if (!result) {
      return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
    }

    res.status(200).send({ message: "Producto actualizado con éxito.", product: result });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
//DELETE "/:pid"
productsRouter.delete("/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await productManager.deleteProductById(id);
  
      if (!result) {
        return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
      }
  
      res.status(200).send({ message: "Producto eliminado con éxito." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
export default productsRouter;