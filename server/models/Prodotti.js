import mongoose, { Schema } from "mongoose"
    
const prodottiSchema = mongoose.Schema({
    titolo:{
        type: String,
        require: true
    },
    descrizione:{
        type: String,
        require: true
    },
    Immagine:{
        type: String,
        require: true
    },
    Prezzo:{
        type: Decimal128,
        require: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria"
    },
}, {timestamps: true} )

export const Prodotti = mongoose.model("Prodotti", prodottiSchema)