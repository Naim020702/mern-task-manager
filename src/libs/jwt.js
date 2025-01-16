import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign( //genera un json web token
            payload, //el dato a ser encriptado en el token
            TOKEN_SECRET, //This is a secret key used to sign the token. It should be kept highly confidential.
            {
                expiresIn: "1d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}