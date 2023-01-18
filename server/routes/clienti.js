import express from "express"
import { deleteCliente, insertClienti, loginCliente, modifyCliente } from "../controllers/clienti.js"

const router = express.Router()

// Registrazione cliente
router.post("/register", insertClienti)
router.post("/login", loginCliente)

//  Eliminare account
router.delete("/remove", deleteCliente)

// Modifica informazioni account
router.patch("/modify", modifyCliente)

export default router
