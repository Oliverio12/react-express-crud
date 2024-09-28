const express = require("express");
const app = express();
const bd = require("../../db/config");
const bcrypt = require('bcrypt'); // Importa bcrypt
const saltRounds = 10; // Define el número de rondas de sal para bcrypt

app.get("/", (req, res) => {
  const sql = "SELECT * FROM `users`";

  bd.query(sql, (error, resultado) => {

    if (error) {
      console.log(error, "Error al mostrar los datos");
      res.json({
        status: false,
        mensaje: error,
        alerta: "No se pudo obtener la información"
      });
    }

    if (resultado) {
      res.json({
        status: true,
        mensaje: "Datos obtenidos",
        data: resultado,
      });
    }
  });
});

app.get('/:id', (req, res) => {
  const id =  req.params.id;
  const sql = "SELECT * FROM users WHERE idUser = ?"

  bd.query(sql, [id] , (error, result) =>{

      if(error){
          res.json({
              status: false,
              mensaje: error,
              alerta:"No se pudo obtener el usuario"
          });
      }

      if(result){
          res.json({
              status:true,
              mensaje:"Datos obtenidos",
              data: result
          });
      }

  });

});


app.post("/", (request, response) => {

  const { userName, email, password } = request.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return response.json({
        status: false,
        mensaje: err,
        alerta: "Error al encriptar la contraseña",
      });
    }

    const sql = "INSERT INTO users SET ?";
    bd.query(sql, { userName, email, password: hash }, (error, resultado) => {
      if (error) {
        return response.json({
          status: false,
          mensaje: error,
          alerta: "Error al insertar",
        });
      }
      if (resultado) {
        return response.json({
          status: true,
          mensaje: "Insertado correctamente",
          data: resultado,
        });
      }
    });
  });
});


app.delete('/:id', (req, res) =>{
    const id =  req.params.id;
    const sql = "DELETE FROM users WHERE idUser = ?";

    bd.query(sql, [id] , (error, result) =>{

        if(error){
            res.json({
                status: false,
                mensaje: error,
                alerta:"No se pudo eliminar el usuario"
            });
        }

        if(result){
            res.json({
                status:true,
                mensaje:"Usuario eliminado completamente",
                data: result
            });
        }

    });

});

// Actualizar (editar) usuario
app.put('/:id', (req, res) => {
    const id = req.params.id;
    const { userName, email, password } = req.body;

    // Si hay una contraseña, la encriptamos antes de hacer la consulta
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.json({
          status: false,
          mensaje: err,
          alerta: "Error al encriptar la contraseña"
        });
      }

      const sql = `UPDATE users SET userName = ?, email = ?, password = ? WHERE idUser = ${id}`;

      // Usamos el hash en lugar de la contraseña original
      bd.query(sql, [userName, email, hash], (error, result) => {
        if (error) {
          return res.json({
            status: false,
            mensaje: error,
            alerta: "No se pudo modificar el usuario"
          });
        }

        if (result) {
          return res.json({
            status: true,
            mensaje: "Datos modificados correctamente",
            data: result
          });
        }
      });
    });
});

module.exports = app;
