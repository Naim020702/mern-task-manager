import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";

//Este es el servidor
const app = express();

app.use(morgan("dev")); //para que cada vez que llega una peticion al servidor, sea mostrada por consola

app.use(express.json());

app.use("/api", authRoutes);

export default app;

// La carpeta routes es para crear todas las urls del backend, todas las rutas que el front puede pedir
// La careta controllers para que podamos crear funciones que se van a ejecutar cuando se visite una url en particular
// Models para guardar los modelos de datos de nuestra bases de datos. Mongo podemos almacenar cualquier dato pero gracias a estos modelos nosotros podemos decirle que datos queremos que guarde y si no cumple con los datos que hemos especificado que nos de un error, estamos creando esquemas
// Middleware, nos van a servir para nosotros poder decirle que rutas estan protegidas por usuarios autenticados. Si estas autenticado podes seguir, sino error
// schemas o validators, crear esquemas para que cuando llegan los datos al backend los validamos
// libs para poder escribir codigo que podemos reimportar varias veces
