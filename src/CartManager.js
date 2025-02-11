import fs from "fs";

class CartManager {
    constructor(pathFile){
     this.pathFile = pathFile;
    }
//getCartById 
getCartById = async (id) => {
  try {
    const fileData = await fs.promises.readFile (this.pathFile, "utf-8");
    const carts = JSON.parse (fileData);
    const cart = carts.find((cart) => cart.id === id);

      if (!cart) {
      throw new Error(`Carrito con ID ${id} no encontrado.`);
    }

    return cart;
  } catch (error) {
    throw new Error(`Error al obtener el carrito con ID ${id}: ${error.message}`);
  }
};
//addCart añadir un carrito nuevo
addCart= async (cart) => {
    try {
      const fileData = await fs.promises.readFile (this.pathFile, "utf-8");
      const carts = fileData ? JSON.parse(fileData) : [];
      const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      const newCart = {
        id: newId,
        products: []
      };
        carts.push(newCart);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2));
        return newCart;
    } catch (error) {
      throw new Error(`Error al agregar carrito: ${error.message}`);
    }
  };
//addProductInCartById
addProductInCartById = async (cartId, productId, quantity=1) => {
  try {
    const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
    const carts = fileData ? JSON.parse(fileData) : [];
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex === -1) {
      throw new Error(`Carrito con ID ${cartId} no encontrado.`);
    }
    const productIndex = carts[cartIndex].products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity += quantity;
    } else {
      carts[cartIndex].products.push({ id: productId, quantity });
    }
    await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2));

    return carts[cartIndex];
  } catch (error) {
    throw new Error(`Error al agregar producto al carrito: ${error.message}`);
  }
};
}

export default CartManager;