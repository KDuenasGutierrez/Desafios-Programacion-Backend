// servidor
import express from 'express';


const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));

//Ruta inicial
app.get("/", (req, res)=>{
    res.send("<h1>¡Este es el Desafio 6!</h1> <h2>cambia a '/products'</h2>");
});

//Productos
const productos = [
    {id: 1,nombre: 'Celular_1'},
    {id: 2,nombre: 'Celular_2'},
    {id: 3,nombre: 'Celular_3'},
    {id: 4,nombre: 'Celular_4'},
    {id: 5,nombre: 'Celular_5'},
    {id: 6,nombre: 'Celular_6'},
    {id: 7,nombre: 'Celular_7'},
    {id: 8,nombre: 'Celular_8'},
    {id: 9,nombre: 'Celular_9'},
    {id: 10,nombre: 'Celular_10'},
    {id: 11,nombre: 'Celular_11'},
    {id: 12,nombre: 'Celular_12'},
    {id: 13,nombre: 'Celular_13'},
    {id: 14,nombre: 'Celular_14'},
];

//Ruta para obtener todos los productos
// Ruta para obtener los primeros N productos (limit)
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit) || productos.length;

    console.log("Todo lo de Query: ", req.query);

    if (limit > productos.length) {
        return res.send(`En este momento supera el número de productos en la lista. Solo tenemos ${productos.length} productos.`);
    } else {
        res.send(productos.slice(0, limit));
    }
});

//Ruta para obtener un producto por su ID
app.get('/products/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const producto = productos.find(p=> p.id === id);
    if (producto){
        res.json(producto);
    } else {
        res.status(404).json({
            error: 'Producto no encontrado'
        });
    }
});

//Inicio de servidor
app.listen(PORT, () => {
    console.log(`Servidor activado con exito!! en http://localhost:${PORT}`);
});


// Rutas
// http://localhost:8080/products
// http://localhost:8080/products?limit=5
// http://localhost:8080/products/2
// http://localhost:8080/products/34123123