import mongoose, { Schema } from "mongoose"

const ruoliSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    descrizione:{
        type: String,
        require: true
    }
}, {timestamps: true} )

export const Ruolo = mongoose.model("Ruolo", ruoliSchema)