const express= require("express");
const cors= require("cors");
const mysql= require("mysql2/promise");
const bcrypt = require('bcrypt');

require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.POST || 5000;

server.listen(PORT, () =>{
    console.log(`Server runnig in port: http://localhost:${PORT}`)
});

//Función para conectar con la base de datos

async function getConnection () {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    await conn.connect();
    console.log("conexión con la BD" + conn.threadId)
    return conn;
};

//Endpoint para obtener todos los personajes
server.get('/characters', async (req, res) => {
    try {
      const conn = await getConnection();
      const select = 'SELECT * FROM characters';
      const [result] = await conn.query(select);
  
      res.status(200).json({
        info: { count: result.length }, // número de elementos
        results: result, // listado
      });
      await conn.end();
    } catch (error) {
        res.status(400).json({
            success: false
        });
    }
  });

//Endpoint para añadir un nuevo personaje
server.post('/characters', async (req, res) => {
    try {
        const conn = await getConnection();
        const { name, gender, house, patronus, image } = req.body;
        const sqlInsert = 'INSERT INTO characters (name, gender, house, patronus, image) VALUES (?, ?, ?, ?, ?)';
        const [newCharachter] = await conn.query(sqlInsert, [
            name, 
            gender, 
            house, 
            patronus, 
            image
        ]);
        res.status(200).json({
            success: true,
            id: newCharachter.insertId,
        });
        await conn.end();
    } catch (error) {
        res.status(400).json({
            success: false
        });
    }
});

// Endpoint para buscar un personaje por id
server.get('/characters/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const conn = await getConnection();
      const select = 'select * from characters where id = ?';
      const [result] = await conn.query(select, [id]); 
      if (result.length === 0) {
        res.status(400).json({ message: 'El id que buscas no existe en nuestra base de datos' });
      } else {
        res.status(200).json(result[0]);
      };
      await conn.end();
    } catch (error) {
      res.status(400).json({
        success: false
        });
    }
  });

//Endpoint para actualizar un personaje existente
server.put('/characters/:id', async (req, res) => {
    try {
        const conn = await getConnection();
        const idCharacter = req.params.id;
        const newData = req.body;
        const modifySql =
            'UPDATE characters SET name = ?, gender = ?, house = ?, patronus = ?, image = ? WHERE id = ?';
        const [result] = await conn.query(modifySql, [
             newData.name,
             newData.gender,
             newData.house,
             newData.patronus,
             newData.image,
             idCharacter,
         ]);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true });
        } else {
             res.status(200).json({ success: false, message: 'No hay coincidencias con ningún id ' });
        };
        console.log(result);
        await conn.end();
    } catch (error) {
        res.status(400).json({
            success: false
            });
    }   
  });


//Endpoint para eliminar un personaje
server.delete('/characters/:id', async (req, res) => {
    try {
        const conn = await getConnection();
        const idCharacter = req.params.id;
        const deleteSql = 'DELETE FROM characters WHERE id = ?';
        const [result] = await conn.query(deleteSql, [idCharacter]);
        if (result.affectedRows > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(200).json({ success: false, message: 'No hay coincidencias con ningún id ' });
        };
        console.log(result);
        await conn.end();
    } catch (error) {
        res.status(400).json({
            success: false
            });
    }
  });

  //Endpoint registro usuario
  server.post('/register', async (req, res) => {
    const conn = await getConnection();
    const { email, name, direction, password } = req.body; 
    const selectEmail = 'SELECT * FROM usuarios_db WHERE email = ?';
    const [emailResult] = await conn.query(selectEmail, [email]);

    if (emailResult.length === 0) {
      const hasshedPassword = await bcrypt.hash(password, 10); //encriptar la contraseña del usuario
      const insertUser =
        'INSERT INTO usuarios_db (email, name, direction, password ) VALUES (?,?,?,?)';
      const [newUser] = await conn.query(insertUser, [email, name, direction, hasshedPassword]);
      res.status(201).json({ success: true, id: newUser.insertId });
    } else {
      res.status(200).json({ success: false, message: 'El usuario ya existe' });
    };
    await conn.end();
  });