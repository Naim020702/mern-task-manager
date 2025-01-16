import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const {email, password, username} = req.body; //extrae esos tres elementos del cuerpo de la peticion de registro

    try {

        const passwordHash = await bcrypt.hash(password, 10); //aguardar a que termine el hash 10 veces de la pass extraida

        //Utilizamos el esquema creado para definir un nuevo usuario
        const newUser = new User({
            username,   //Username extraido de la peticion
            email,   //Email extraido de la peticion
            password: passwordHash   //Pass hasheada
        });

        const userSaved = await newUser.save(); //aguardar a que se guarde en la db
        const token = await createAccessToken({id: userSaved._id}) //aguardar a que se cree un token

        res.cookie("token", token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const login = async (req, res) => {
    const {email, password } = req.body;

    try {

        const userFound = await User.findOne({email});

        if (!userFound) return res.status(400).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccessToken({ id: userFound._id });

        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    // console.log(req.user); //chequeamos lo que nos pasa validateToken. Vemos la info que se le pegó a la request
    const userFound = await User.findById(req.user.id); //Chequea en la base de datos

    if (!userFound) return res.status(400).json({ message: "User not found" });

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
};