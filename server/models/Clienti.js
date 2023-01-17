import mongoose, { Schema } from "mongoose"

const clientiSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    cognome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    citta:{
        type: String,
        require: true
    },
    provincia:{
        type: String,
        require: true
    },
    indirizzo:{
        type: String,
        require: true
    },
    nCivico:{
        type: Number,
        require: true
    },
    CAP:{
        type: Number,
        require: true
    },
    nTelefono:{
        type: String,
        require: true
    },
    ruolo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ruoli"
    },
}, {timestamps: true} )

export const Clienti = mongoose.model("Clienti", clientiSchema)