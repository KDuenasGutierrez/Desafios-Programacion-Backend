import fs from "fs";

export class ProductManager {

    constructor(file) {
      this.file = file;
    }
    
    async CreateProducts(product) {
      const newProduct ={
        id: await this.GetId(),
        name: product.name ?? "Sin Nombre",
        description: product.description ?? "Sin descripción",
        price: product.price ?? "Sin Precio",
        stock: product.stock ?? "Sin Stock",
      };

      const products = await this.GetAllProducts();
      products.push(newProduct);

      try{
        await fs.promises.writeFile(this.file, JSON.stringify(products, null, "\t"));
        return "Producto Creado Exitosamente!";
      } catch(e) {
        console.error("Error al crear el producto\n", e);
        return "Error al crear el producto"
      }
    }

    async GetAllProducts() {
      try{
        const products = await fs.promises.readfile(this.file, "utf-8");
        return JSON.parse(products);
      } catch (error) {
        console.error(error);

        return [];
      }
    }

    async UpdateProduct (id, product) {
        const products = await this.GetAllProducts();
        let productUpdate = {};

        for (let key in products) {
          if (products[key],id === id ){
              products[key].name = products.name ? products.name : users[key].name;
              products[key].description = products.description ? products.description : users[key].description;
              products[key].price = products.price ? products.price : users[key].price;
              products[key].stock = products.stock ? products.stock : users[key].stock;

              productUpdate = products[key];
          }
        }

        try {
          await fs.promises.writeFile(this.file, JSON.stringify(products, null, "\t"));

          return productUpdate;
        } catch(e) {
          console.error(e);
          return {
            message: "Error con la actualizacion del producto"
          }
        }
    }

    async DeleteProduct(id) {
      const products = await this.GetAllProducts();
      const currentLength = products.length;

      const productsProccesed = products.filter(product => product.id != id);

      const finalLength = productsProccesed.length;

      try {
        if(currentLength === finalLength){
          throw new Error (`No fue posible eliminar el usuario ${id}`);
        }
        await fs.promises.writeFile(this.file, JSON.stringify(productsProccesed, null, "\t"));

        return `El usuario ${id} fue eliminado con exito!`;
      } catch(e) {
        return e.message;
      }
    }

    async GetId() {
      const products = await this.GetAllProducts();

      if(products.length>0){
          return parseInt(products[products.length - 1].id + 1);
      }
      return 1;
    }
  }