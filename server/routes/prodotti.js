import express from 'express'
import { deleteProdotto, getAllProdotti, insertProdotto, modifyProdotto } from '../controllers/prodotti.js'

const router = express()

// Visualizzare tutti i prodotti
router.get("/getAll", getAllProdotti)

// Inserimento nuovo prodotto
router.post("/insert", insertProdotto)

// Modifica informazioni prodotti
router.patch("/modify", modifyProdotto)

// Eliminare un prodotto specifico
router.delete("/delete", deleteProdotto)

export default router