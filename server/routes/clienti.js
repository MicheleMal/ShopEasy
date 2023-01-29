import express from "express"
import { deleteCliente, insertClienti, loginCliente, modifyCliente, formRegister } from "../controllers/clienti.js"

const router = express.Router()

router.get("/account",formRegister);

// Registrazione cliente
router.post("/register", insertClienti)
router.post("/login", loginCliente)

//  Eliminare account
router.delete("/remove", deleteCliente)

// Modifica informazioni account
router.patch("/modify", modifyCliente)

export default router
