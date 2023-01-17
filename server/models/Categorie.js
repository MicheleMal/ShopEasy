import mongoose, { Schema } from "mongoose"

const categorieSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    descrizione:{
        type: String,
        require: true
    }
}, {timestamps: true} )

export const Categorie = mongoose.model("Categorie", categorieSchema)