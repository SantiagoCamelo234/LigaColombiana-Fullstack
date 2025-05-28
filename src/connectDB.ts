import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/miapi'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Conectado exitosamente')
    }
    catch(error){
        console.log('No se pudo conectar la base de datos', error)
        throw Error
    }

}

// mongod --dbpath "C:\data\db"
