import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import universalCookieExpress from "universal-cookie-express";

import authRoutes from "./routes/auth.routes.js";
import taskRouthes from "./routes/tasks.routes.js";

//Este es el servidor
const app = express();

app.use(morgan("dev")); //para que cada vez que llega una peticion al servidor, sea mostrada por consola

app.use(express.json()); //Cada que llega una solicitud a nuestro servidor de express esta linea se ejecuta primero. Si la solicitud contiene datos en formato JSON, este middleware se encarga de analizar esos datos.  Los datos JSON se transforman en un objeto JavaScript de fácil manejo. Este objeto se coloca en la propiedad req.body del objeto de solicitud. 

app.use(cookieParser()); //Esta linea debe estar ubicada antes de app.use("/api", authRoutes);, de no ser asi las cookies nos aparecen indefinidas

app.use("/api", authRoutes); //El middleware es una función que tiene acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware. Cualquier solicitud que comience con "/api" pasara por el middleware definido en authRoutes

app.use("/api", taskRouthes);

export default app;

// La carpeta routes es para crear todas las urls del backend, todas las rutas que el front puede pedir

// La carpeta controllers para que podamos crear funciones que se van a ejecutar cuando se visite una url en particular

// Models para guardar los modelos de datos de nuestra bases de datos. En Mongo podemos almacenar cualquier dato pero gracias a estos modelos nosotros podemos decirle que datos queremos que guarde y si no cumple con los datos que hemos especificado que nos de un error, estamos creando esquemas

// Middleware, nos van a servir para nosotros poder decirle que rutas estan protegidas por usuarios autenticados. Si estas autenticado podes seguir, sino error

// schemas o validators, crear esquemas para que cuando llegan los datos al backend los validamos

// libs para poder escribir codigo que podemos reimportar varias veces
