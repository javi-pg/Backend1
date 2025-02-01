import fs from "fs";
class ProductManager{
constructor (pathFile){
 this.pathFile = pathFile;
}
 //getProducts 
 getProducts = async () => {
   try {
    //leemos el archivo y guardamos su contenido 
    const fileData = await fs.promises.readFile (this.pathFile, 'utf-8');
    const data = JSON.parse (fileData);

    return data;
   }catch(error){
    throw new Error(`Error al leer el archivo de productos: ${error.message}`)
  }
 }
 //getProductsById 
 getProductsById = async (id) => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const data = fileData ? JSON.parse(fileData) : [];

      const product = data.find((prod) => prod.id === id);

        if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto con ID ${id}: ${error.message}`);
    }
  };
 //AddProduct
 addProduct = async (product) => {
    try {
      const products = await this.getProducts();
      const requiredFields = ["title", "description", "code", "price", "status", "stock", "category"];
      const missingFields = requiredFields.filter((field) => !product[field]);
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos: ${missingFields.join(", ")}`);
      }
       const codeExists = products.some((p) => p.code === product.code);
      if (codeExists) {
        throw new Error("El código del producto ya existe.");
      }
      const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
      const newProduct = {
        id: newId,
        ...product,
      };
        products.push(newProduct);
        await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
        return newProduct;

    } catch (error) {
      throw new Error(`Error al agregar producto: ${error.message}`);
    }
  };
  
 //setProductById
 setProductById = async (id, updatedFields) => {
        try {
          const products = await this.getProducts();
          const productIndex = products.findIndex((product) => product.id === id);
      
          if (productIndex === -1) {
            return null; 
          }
          const updatedProduct = {
            ...products[productIndex],
            ...updatedFields, 
          };
          if (
            updatedFields.code &&
            products.some((p) => p.code === updatedFields.code && p.id !== id)
          ) {
            throw new Error("El código del producto ya existe en otro producto.");
          }
      
          products[productIndex] = updatedProduct;
      
          await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
      
          return updatedProduct;
        } catch (error) {
          throw new Error(`Error al actualizar producto: ${error.message}`);
        }
      };
      
 //deleteProductById 
 deleteProductById = async (id) => {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        return null; 
      }
      products.splice(productIndex, 1);
      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2));
  
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  };
  

}

export default ProductManager;