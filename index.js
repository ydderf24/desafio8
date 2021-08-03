const express = require('express'); 
const app = express();
const port = 8080;
let productos = [];



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/productos/guardar/' , (req, res) =>{
  const body = req.body;
  console.log(body);

  if (!body.nombre ||
      !body.precio ||
      !body.thumbnail ||
      typeof body.nombre != 'string' ||
      typeof body.precio != 'number' ||
      typeof body.thumbnail != 'string'){

        res.status = 400;

        return res.json({
          msg: "ingresaste los datos del producto mal"
        })
      }
      const nuevoProducto = {
        id: productos.length + 1,
        nombre: body.nombre,
        precio: body.precio,
        thumbnail: body.thumbnail
      }
      
      productos.push(nuevoProducto);

      res.status(201).json({
        data: nuevoProducto
      })
})

app.get('/api/productos/listar', (req, res) => {

  if(productos.length === 0){
    return res.status(404).json({
      error: "no hay productos cargados",
    });
  }
  
  res.json({
    data: productos
  })
  })
app.get('/api/productos/listar/:id' , (req, res) => {

  const idBuscado = req.params.id;

  const producto = productos.find((aProduct) => aProduct.id == idBuscado);

  if (!producto) {
    return res.status(404).json({
      msg: 'No existe un producto con este id',
    });
  }

  res.json({
    data: producto,
  });
  })





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})