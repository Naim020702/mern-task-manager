import mongoose from "mongoose";

//Este esquema define la estructura de los documentos que representarán a los usuarios en la colección de MongoDB.
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true, //necesario?
        trim: true //Quita espacios finales innecesarios
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true //Momento en que se crea
});

export default mongoose.model("User", userSchema); //Exporta el modelo creado como el valor predeterminado del módulo. Esto significa que cuando otro archivo importa este módulo, recibirá automáticamente el modelo "User"