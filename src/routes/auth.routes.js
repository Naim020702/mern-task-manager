import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js"; //importacion de los controladores a ser llamados
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router(); //Este enrutador actúa como un mini-aplicación dentro de tu aplicación principal, encargándose de gestionar un conjunto específico de rutas y sus correspondientes controladores.

//En este enrutador se definen las rutas y sus correspondientes controladores utilizando métodos como get, post, put, delete, etc.
router.post("/register", validateSchema(registerSchema), register); //.post() se utiliza para definir una ruta que responde a solicitudes HTTP POST. Cualquier POST que llegue a la dirección "/register" será manejada por esta ruta. register es un controlador, una función que se ejecutará cuando se reciba una solicitud POST a la ruta /register

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile); //Cada que queremos proteger una ruta ponemos primero su authRequired antes del controlador que la maneje

export default router; //El enrutador se exporta para poder ser utilizado en otros módulos de la aplicación.