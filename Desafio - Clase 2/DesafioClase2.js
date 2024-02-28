// Definimos la clase ProductManager
class ProductManager {
    // Creamos un constructor que inicializa un arreglo vacío de productos
    constructor() {
      this.products = [];
    }
  
    // Creamos un método privado que genera un id único para cada producto
    #generateID() {
      // Si el arreglo está vacío, el id es 1
      if (this.products.length === 0) return 1;
      // Si no, el id es el último id más 1
      return this.products[this.products.length - 1].id + 1;
    }
  
    // Creamos un método público que agrega un producto al arreglo
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validamos que todos los campos sean proporcionados
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        // Si no, lanzamos un error
        throw new Error("Todos los campos son obligatorios");
      }
      // Validamos que el código no esté repetido
      const productExists = this.products.some(
        (product) => product.code === code
      );
      if (productExists) {
        // Si sí, lanzamos un error
        throw new Error("El producto ya existe");
      }
      // Generamos el id del producto
      const id = this.#generateID();
      // Creamos el objeto producto con los campos dados y el id
      const product = { id, title, description, price, thumbnail, code, stock };
      // Agregamos el producto al arreglo
      this.products.push(product);
    }
  
    // Creamos un método público que devuelve el arreglo de productos
    getProducts() {
      return this.products;
    }
  
    // Creamos un método público que busca un producto por su id
    getProductById(id) {
      // Validamos que el id sea proporcionado
      if (!id) {
        // Si no, lanzamos un error
        throw new Error("El id es obligatorio");
      }
      // Buscamos el producto en el arreglo
      const product = this.products.find((product) => product.id === id);
      // Si no lo encontramos, lanzamos un error
      if (!product) {
        throw new Error("El producto no existe");
      }
      // Si lo encontramos, lo devolvemos
      return product;
    }
  }
  
  // Creamos una instancia de la clase ProductManager
  const productManager = new ProductManager();
  
  // Llamamos al método getProducts, debe devolver un arreglo vacío
  console.log(productManager.getProducts()); // []
  
  // Llamamos al método addProduct con los campos dados
  productManager.addProduct(
    "Memoria Ram 8GB",
    "Esta es una Memoria Ram 8GB",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  
  // Llamamos al método getProducts nuevamente, debe aparecer el producto agregado
  console.log(productManager.getProducts()); // [{ id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }]
  
  // Llamamos al método addProduct con los mismos campos, debe arrojar un error
  productManager.addProduct(
    "Memoria Ram 8GB",
    "Esta es una Memoria Ram 8GB",
    200,
    "Sin imagen",
    "abc123",
    25
  ); // Error: El producto ya existe
  
  // Evaluamos que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
  console.log(productManager.getProductById(1)); // { id: 1, title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25 }
  console.log(productManager.getProductById(2)); // Error: El producto no existe
  