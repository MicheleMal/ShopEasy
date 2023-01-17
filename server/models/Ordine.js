import mongoose, { mongo, Schema } from "mongoose"

const ordineSchema = mongoose.Schema({
    Cliente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clienti"
    },
    Prodotti:{
        type: Array,
        ref: "Prodotti"
    }
}, {timestamps: true} )

export const Ordine = mongoose.model("Ordine", ordineSchema)