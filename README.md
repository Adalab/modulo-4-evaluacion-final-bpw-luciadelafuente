## **HARRY POTTER CHARACTERS API REST** 

![harry-potter 1708702569 2268](https://github.com/Adalab/modulo-4-evaluacion-final-bpw-luciadelafuente/assets/161826787/825cdeee-e1ba-4fb2-8c6d-3d94004b9790)

## 📝​ **Tabla de contenidos**
- Introducción.
- Instalación.
- Dependencias necesarias.
- Endpoints.

## 💡​ **Introducción**
En este repositorio puedes encontrar un proyecto que nos proporciona una API REST para poder emplear una base de datos de los principales personajes de la famosa saga Harry Potter. Aquellos usuarios que quieran van a poder emplear esta API van a poder consultar todos os personajes, buscar personajes por id, modificar personajes y eliminarlos. Además van a encontrar la opción de que un usuario se registre, y pueda hacer un inicio y un cierre de sesión.

## ​🔧​ ​​**Instalación**

Para ejecutar el backend de la API de Harry Potter de manera local, siga los siguientes pasos:

1. Clona este repositorio en tu local:

    ```bash
    git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-luciadelafuente
    ```

2. Navega hasta el directorio del proyecto:

    ```bash
    cd modulo-4-evaluacion-final-bpw-luciadelafuente
    ```

3. Instala las dependencias usando npm:

    ```bash
    npm install
    ```

4. Configura tu base de datos MySQL y actualiza el archivo con las credenciales de tu base de datos.

5. Arranca el servidor:

    ```bash
    npm run dev
    ```


## ✅**Dependencias necesarias**

- Express.
- jsonwebtoken.
- bcrypt.
- dotenv.
- cors.

## 💻​**EndPoints**

### Obtener todos los personajes
- **Endpoint:** `/characters`
- **Method:** `GET`
- Obtiene todos los personajes de la base de datos.

### Obtener un personaje a través de su id
- **Endpoint:** `/pokemon/:id`
- **Method:** `GET`
- Obtiene un personaje a través de su id.

### Añadir un personaje nuevo
- **Endpoint:** `/characters`
- **Method:** `POST`
- Añade un nuevo personaje (sólo podrán crear un personaje nuevo los usuarios que están registrados y han hecho login).

### Modificar un personaje ya existente
- **Endpoint:** `/characters/:id`
- **Method:** `PUT`
- Actualiza un personaje existente (sólo podrán modificar un personaje existente los usuarios que están registrados y han hecho login).

### Eliminar un personaje
- **Endpoint:** `characters/:id`
- **Method:** `DELETE`
- Elimina un personaje de la base de datos (sólo podrán eliminar un personaje existente los usuarios que están registrados y han hecho login). 

### Registro de un nuevo usuario
- **Endpoint:** `/register`
- **Method:** `POST`
- Crear un nuevo usuario. 

### Inicio de sesión
- **Endpoint:** `/login`
- **Method:** `POST`
- Inicio de sesión de un usuario ya registrado.

### Cierre de sesión
- **Endpoint:** `/logout`
- **Method:** `POST`
- Cierre de sesión de usuario.

### Obtener todos los usarios registrados
- **Endpoint:** `/users`
- **Method:** `GET`
- Obtiene todos los usuarios que se han registrado. 
