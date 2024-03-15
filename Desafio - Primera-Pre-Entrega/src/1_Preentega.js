// servidor
import express from 'express';
import { ProductManager } from './ProductManager.js';


const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}));


const UM = new ProductManager("./Products.json");

app.get("/api/products",async(req, res)=>{
    res.send(await UM.GetAllProducts());
});

app.post("/api/products",async(req, res)=>{
    const response = await UM.CreateProduct(req.body);

    res.status(201).send(response);
});

app.put("/api/products/:pid",async(req, res)=>{
    const pid = req.params.pid;
    res.send(await UM.UpdateProduct(pid, req.body));
});

app.delete("/api/products/:pid",async(req, res)=>{
    const pid = req.params.pid;
    res.send(await UM.DeleteProduct(pid));
});

//Inicio de servidor
app.listen(PORT, () => {
    console.log(`Servidor activado con exito!! en http://localhost:${PORT}`);
});


// //Productos
// const productos = [
//     {id: 1,nombre: 'Celular_1'},
//     {id: 2,nombre: 'Celular_2'},
//     {id: 3,nombre: 'Celular_3'},
//     {id: 4,nombre: 'Celular_4'},
//     {id: 5,nombre: 'Celular_5'},
//     {id: 6,nombre: 'Celular_6'},
//     {id: 7,nombre: 'Celular_7'},
//     {id: 8,nombre: 'Celular_8'},
//     {id: 9,nombre: 'Celular_9'},
//     {id: 10,nombre: 'Celular_10'},
//     {id: 11,nombre: 'Celular_11'},
//     {id: 12,nombre: 'Celular_12'},
//     {id: 13,nombre: 'Celular_13'},
//     {id: 14,nombre: 'Celular_14'},
// ];


// app.get('/products', (req, res) => {
//     const limit = parseInt(req.query.limit) || productos.length;

//     console.log("Todo lo de Query: ", req.query);

//     if (limit > productos.length) {
//         return res.send(`En este momento supera el número de productos en la lista. Solo tenemos ${productos.length} productos.`);
//     } else {
//         res.send(productos.slice(0, limit));
//     }
// });

