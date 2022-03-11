const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname, 'public'))

const server = app.listen(PORT, () => {
    console.log("servidor levantado en el puerto: " + server.address().port);
  });

  server.on("error", (error) => console.log(`hubo un error ${error}`));