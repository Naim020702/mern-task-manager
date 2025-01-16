import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    // console.log("validatin token");

    // console.log(req.headers);

    const {token} = req.cookies; //Obtenemos las cookies
    // console.log(cookies);
    if (!token) return res.status(401).json({ message: "No token, authorization denied" }); 

    jwt.verify(token, TOKEN_SECRET, (err, user) => { //verifica la autenticidad y validez de un JWT. recibe el token a verificar y la misma clave secreta con la que se creo el JWT originalmente
        if (err) return res.status(403).json({ message: "Invalid Token" });

        // console.log(user);

        req.user = user; //Le pega a la request, que va de mano en mano, la info del usuario. Esto es lo que se le pasa al controller profile

        next();
    });
};