const express= require("express");
const cors= require("cors");
const mysql= require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


require('dotenv').config();

//Creo mi servidor
const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>{
    console.log(`Server runnig in port: http://localhost:${PORT}`)
});

//Función para conectar con mi base de datos
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

//Endpoint para añadir un nuevo personaje y ejecuto la función authenticateToken para que sólo puedan crear un personaje nuevo los usuarios que están registrados y han hecho login, es decir, que tienen un token válido
server.post('/characters', authenticateToken, async (req, res) => {
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

//Endpoint para actualizar un personaje existente y ejecuto la función authenticateToken para que sólo puedan modificar un personaje existente los usuarios que están registrados y han hecho login, es decir, que tienen un token válido
server.put('/characters/:id', authenticateToken, async (req, res) => {
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


//Endpoint para eliminar un personaje y ejecuto la función authenticateToken para que sólo puedan eliminar un personaje los usuarios que están registrados y han hecho login, es decir, que tienen un token válido
server.delete('/characters/:id', authenticateToken, async (req, res) => {
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

  //Endpoint para el registro de un usuario
  server.post('/register', async (req, res) => {
    const conn = await getConnection();
    const { email, name, address, password } = req.body; 
    const selectEmail = 'SELECT * FROM usuarios_db WHERE email = ?';
    const [emailResult] = await conn.query(selectEmail, [email]);

    if (emailResult.length === 0) {
      const hasshedPassword = await bcrypt.hash(password, 10); //Con hash se encripta la contraseña del usuario
      console.log(hasshedPassword);
      const insertUser =
        'INSERT INTO usuarios_db (email, name, address, password ) VALUES (?,?,?,?)';
      const [newUser] = await conn.query(insertUser, [email, name, address, hasshedPassword]);
      res.status(201).json({ success: true, id: newUser.insertId });
    } else {
      res.status(200).json({ success: false, message: 'El usuario ya existe' });
    };
    await conn.end();
  });

  //Endpoint para el login de un usuario
  server.post('/login', async (req, res) => {
    const conn = await getConnection();
    const { email, password } = req.body;
    const selectUser = 'SELECT  * FROM usuarios_db WHERE email =  ?';
    const [resultUser] = await conn.query(selectUser, [email]);
  
    if (resultUser.length !== 0) {
      const isSamePassword = await bcrypt.compare(
        password,
        resultUser[0].password
      );
      if (isSamePassword) {
        const infoToken = { email: resultUser[0].email, id: resultUser[0].id };
        const token = jwt.sign(infoToken, 'draco dormiens nunquam titillandus', {
          expiresIn: '1h',
        });
        res.status(201).json({ succes: true, token: token });
      } else {
        res.status(400).json({ succes: false, message: 'La contraseña introducida es incorrecta.'});
      }
    } else {
      res.status(400).json({ succes: false, message: 'El email introducido es incorrecto.'});
    }
  });

  //Endpoint para el cierre de sesión de un usuario
  server.put("/logout", function (req, res) {
        const authHeader = req.headers["authorization"];
        jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg : 'Has sido desconectado' });
        } else {
            console.log(err);
            res.send({msg:'Error'});
        }
        });
    });

  //Función para la autenticación del token
  function authenticateToken(req, res, next) {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
        res.status(400).json({ 
            success: false, 
            message: 'No autorizado' 
        });
    } else {
        try {
            const verifiedToken = jwt.verify(tokenString, 'draco dormiens nunquam titillandus');
            req.userInfo = verifiedToken;
        } catch (error) {
            res.status(400).json({ 
                success: false, 
                message: 'No se ha podido validar el token' 
            });
        }
        next();
    }
};

//Endpoint para poder ver los usuarios que ya hay registrados en nuestra BD
server.get('/users', authenticateToken, async (req, res) => {
    try {
        const conn = await getConnection();
        const usersSql = 'SELECT * FROM usuarios_db';
        const [results] = await conn.query(usersSql);
        res.status(200).json({ 
            succes: true, 
            data: results 
        });
   
    } catch (error) {
        console.error('Error al obtener el perfil de usuario:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener el perfil de usuario.' 
        });
    } 
  });