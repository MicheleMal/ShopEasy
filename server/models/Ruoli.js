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

export const Ruoli = mongoose.model("Ruoli", ruoliSchema)