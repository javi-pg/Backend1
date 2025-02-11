import { Router } from "express";

import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");
console.log("✅ views.router.js está cargado");
//vista de home
router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        console.log("🚀 Enviando productos a Handlebars:", products); 
        res.render("home", { products });
    } catch (error) {
        console.log("Error al obtener productos:", error);
        res.render("home", { products: [] });  
    }
});

//vista de productos en tiempo real
router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});

export default router;