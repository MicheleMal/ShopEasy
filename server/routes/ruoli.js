import express from 'express'
import {deleteRuolo, insertRuolo, modifyRuolo} from "../controllers/ruoli.js"

const router = express.Router()

// Inserimento nuovo ruolo
router.post("/inRuolo", insertRuolo)

// Modifica nome e/o descrizione di un ruolo specifico
router.patch("/modify", modifyRuolo)

// Elimina un ruolo tramite id
router.delete("/delete", deleteRuolo)

export default router