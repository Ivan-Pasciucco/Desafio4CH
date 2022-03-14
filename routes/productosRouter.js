const express = require("express");
const productosRouter = express.Router();

const products = [];

productosRouter.get("/", (req, res) => {
  const productStr = JSON.stringify(products, null, 3);
  res.type("json");
  productos.length === 0
    ? res.json({ message: "No hay productos agregados" })
    : res.send(productStr);
});

productosRouter.get("/api/productos/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.json({ Error: "Ingrese un numero" });
  } else {
    const productById = productos.findIndexOf((i) => i.id == req.params.id);
    const productStr = JSON.stringify(products[productById], null, 2);
    res.type("json");
    productById !== -1
      ? res.send(productStr)
      : res.json({ message: "No se encontro el producto" });
  }
});
//recibe y agrega un producto, y lo devuelve con su id asignado.
productosRouter.post("/api/productos", (req, res) => {
  let lastItem = products.length - 1;
  lastItem = products[lastItem];
  if (lastItem == undefined) {
    req.body.id = 1;
    products.push(req.body);
  } else {
    const id = lastItem.id + 1;
    req.body.id = id;
    products.push(req.body);
  }
  const productStr = JSON.stringify(products, null, 3);
  res.type("json");
  res.send(`message: Producto agregado con exito ${productStr}`);
});

//recibe y actualiza un producto según su id.
productosRouter.put("/api/productos/:id", (req, res) => {

    const index = products.findIndex(i => i.id == req.body.id)
    if(index !== -1){

        products[index] = req.body
        res.json({
            'mensaje' : 'Producto actualizado correctamente',
            products : products[index]
        })
    }else{
        res.json({'message error':'no se encontro el producto'})
    }
});
productosRouter.delete("/api/productos/:id", (req, res) => {

  if(isNaN(req.params.id)){
    res.json({'message':'Ingrese un numero'})
  }else{
    const index = products.findIndex(i => i.id == req.params.id)
    if (index !== -1){
    productos.splice(index,1)
    res.json({'Mensaje': 'Producto eliminado con exito'})
    }else{
      res.json({'Message' : 'No se pudo eliminar ya que no se encontro el producto seleccionado'})
    }
  }
});

module.exports = productosRouter;
