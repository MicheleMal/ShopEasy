import express from "express"
import { deleteCliente, modifyCliente, formRegister, modifyRuolo } from "../controllers/clienti.js"
import {authenticateToken} from "../middleware/auth.js"

const router = express.Router()

router.get("/account", formRegister);

//  Eliminare account
router.post("/remove", authenticateToken, deleteCliente)

// Modifica informazioni account
router.post("/modify", authenticateToken, modifyCliente)

// Modifica ruolo, solo per chi ha il ruolo admin
router.post("/modifyRuolo", authenticateToken, modifyRuolo)

export default router
