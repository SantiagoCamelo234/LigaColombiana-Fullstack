import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || ''

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Conectado exitosamente')
    }
    catch(error){
        console.log('No se pudo conectar la base de datos', error)
        throw error
    }

}

// mongod --dbpath "C:\data\db"
