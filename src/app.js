import express from "express";
import http from "http";
import { Server } from "socket.io"; 
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import ProductManager from "./ProductManager.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";

const productManager = new ProductManager("./src/data/products.json");
const app = express();
const server = http.createServer (app)
//INPUT - OUTPUT 
const io = new Server (server)

const PORT = 8080;

//handlebars
app.engine ("handlebars", engine());
app.set ("view engine", "handlebars");
app.set ("views","./src/views");

//Middlewares
app.use (express.static("public"));
app.use(express.json());

//endpoints 

app.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts");
});
app.use("/", viewsRouter);
app.use ("/api/products", productsRouter);
app.use ("/api/carts", cartRouter);

//Websockets
io.on ("connection",async (socket)=>{
  console.log("Un nuevo cliente se conectó: ", socket.id);
  socket.emit("updateProducts", await productManager.getProducts());
  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    io.emit("updateProducts", await productManager.getProducts());
    });
    socket.on("deleteProduct", async (id) => {
      await productManager.deleteProductById(id);
      io.emit("updateProducts", await productManager.getProducts());
  });
});

server.listen (PORT, ()=> 
 console.log (`Servidor iniciado en: http://localhost:${PORT}`)
) ;





