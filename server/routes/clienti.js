import express from "express"
import { deleteCliente, modifyCliente, formRegister } from "../controllers/clienti.js"
import {authenticateToken} from "../middleware/auth.js"

const router = express.Router()

router.get("/account",formRegister);

//  Eliminare account
router.delete("/remove", authenticateToken, deleteCliente)

// Modifica informazioni account
router.patch("/modify", authenticateToken, modifyCliente)

export default router
