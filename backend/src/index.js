require("dotenv").config();
//declarando el servidor para expresss
const express = require("express")
const app = express();
const cors = require('cors')

app.use(cors());

//para mostrar el body
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configurando a la BD
require('./db/config');

//declarando y escuchando el puerto
app.set("port", process.env.PORT || 8021)
app.listen(app.get("port"),()=>{
    console.log("Puerto en uso -->", app.get("port"))
})

//la URL para la Api
app.use('/UserDB/v1/', require('./route/index'))

