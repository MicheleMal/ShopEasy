import mongoose from "mongoose";
import { Ruolo } from "../models/Ruoli.js";
import { Cliente } from "../models/Clienti.js"

export const insertClienti = async (req, res)=>{
    const ruolo = "cliente"
    const cliente = req.body
    const idRuoloCliente = await Ruolo.find({nome: "cliente"}).select("_id")

    cliente.ruolo = idRuoloCliente[0]

    console.log(cliente);
    
    const newCliente = new Cliente(cliente)

    
    try {
        await newCliente.save()
        res.status(200).json({
            status: "Ok",
            message: "Cliente aggiunto"
        })
    } catch (error) {
        res.status(400).json({message: error})
    }
}